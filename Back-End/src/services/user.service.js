const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const argon2 = require("argon2");
const {
  ConflictException,
  UnauthorizedException,
  Exception,
  ResourceNotFoundException,
  BadRequestException,
} = require("../exceptions/global.exception");

class UserService {
  static register = async (req) => {
    const { fullName, email, phone, password } = req.body;
    if (email !== "" && email !== undefined) {
      const userExists = await User.findOne({
        email: email,
      });
      if (userExists) throw new ConflictException("Email đã tồn tại");
    }

    if (phone !== "" && phone !== undefined) {
      const userExists = await User.findOne({
        phone: phone,
      });
      if (userExists) throw new ConflictException("Số điện thoại đã tồn tại");
    }

    const hashedPassword = password ? await argon2.hash(password) : null;

    const newUser = new User({
      fullName: fullName,
      email: email,
      phone: phone,
      password: hashedPassword,
      active: true,
    });

    await newUser.save();

    const newCart = new Cart({
      userId: newUser._id,
      items: [],
    });

    await newCart.save();

    return {
      userId: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      active: newUser.active,
    };
  };

  static login = async (req) => {
    const { phone, password } = req.body;

    const user = await User.findOne({
      phone: phone,
    });

    if (!user) {
      throw new UnauthorizedException("Tài khoản hoặc mật khẩu sai");
    }

    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword)
      throw new UnauthorizedException("Tài khoản hoặc mật khẩu sai");

    return {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      active: user.active,
      address: user.address,
    };
  };

  static addNewAddressByMyInfo = async (req) => {
    const { name, detail, isDefault, userId } = req.body;

    const user = await User.findOne({
      _id: userId,
    });

    const newAddress = user.address;

    if (isDefault) {
      // Nếu isDefault = true => bỏ isDefault tất cả address còn lại ủa user
      newAddress.forEach((address) => {
        // Thay đổi trực tiếp
        address.isDefault = false;
      });
    }
    newAddress.push({
      name: name,
      detail: detail,
      isDefault: isDefault,
    });

    user.address = newAddress;

    await user.save();

    return {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      active: user.active,
      address: user.address,
    };
  };

  static updateAddressByMyInfo = async (req) => {
    const { addressId } = req.params;
    const { name, detail, isDefault, userId } = req.body;

    const user = await User.findOne({
      _id: userId,
    });

    const index = user.address.findIndex(
      (item) => item._id.toString() === addressId
    );
    if (index === -1)
      throw new ResourceNotFoundException("Không tìm thấy địa chỉ");

    if (isDefault) {
      user.address.forEach((item) => (item.isDefault = false));
    }
    user.address[index].name = name;
    user.address[index].detail = detail;
    user.address[index].isDefault = isDefault;

    await user.save();

    return {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      active: user.active,
      address: user.address,
    };
  };

  static deleteAddressByMyInfo = async (req) => {
    const { userId, addressId } = req.params;
    const user = await User.findOne({
      _id: userId,
    });

    const addressRemove = user.address.filter(
      (item) => item._id.toString() === addressId
    )[0];

    const newAddress = user.address.filter(
      (item) => item._id.toString() !== addressId
    );
    if (addressRemove.isDefault) {
      // Nếu xóa address là default => Gán default cho address đầu
      newAddress[0].isDefault = true;
    }

    user.address = newAddress;
    await user.save();
  };

  static getUserById = async (req) => {
    const { id } = req.params;

    const user = await User.findOne({
      _id: id,
    });

    if (!user) {
      throw new ResourceNotFoundException(
        "Không tìm thấy user theo Id = " + id
      );
    }

    return {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      active: user.active,
      address: user.address,
    };
  };

  static updateUser = async (req) => {
    const { id } = req.params;
    const { fullName, email, phone } = req.body;

    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      throw new ResourceNotFoundException(
        "Không tìm thấy user theo Id = " + id
      );
    }

    if (user.email !== email) {
      const userEmailExists = await User.findOne({
        email: email,
      });
      if (userEmailExists) {
        throw new ConflictException("Email đã tồn tại");
      }
    }

    if (user.phone !== phone) {
      const userPhoneExists = await User.findOne({
        phone: phone,
      });
      if (userPhoneExists) {
        throw new ConflictException("Số điện thoại đã tồn tại");
      }
    }

    user.fullName = fullName;
    user.email = email;
    user.phone = phone;

    await user.save();

    return {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      active: user.active,
      address: user.address,
    };
  };
}

module.exports = UserService;
