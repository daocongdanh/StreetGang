const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const { ResourceNotFoundException } = require("../exceptions/global.exception");

class CartService {
  static addToCart = async (req) => {
    const { productId, quantity, color, size, userId } = req.body;

    const cart = await Cart.findOne({
      userId: userId,
    });
    if (!cart)
      throw new ResourceNotFoundException("Không tìm thấy giỏ hàng theo user");

    const product = await Product.findOne({
      _id: productId,
    });
    if (!product) throw new ResourceNotFoundException("Không tìm sản phẩm");

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index === -1) {
      const newItem = {
        productId: productId,
        name: product.name,
        image: product.images[0],
        price: product.price,
        discountedPrice: product.discountedPrice,
        slug: product.slug,
        quantity: 1,
        color: color,
        size: size,
      };
      cart.items.push(newItem);
    } else {
      cart.items[index].quantity += quantity;
      cart.items[index].color = color;
      cart.items[index].size = size;
    }

    return await cart.save();
  };

  static updateCart = async (req) => {
    const { quantity, userId } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({
      userId: userId,
    });
    if (!cart)
      throw new ResourceNotFoundException("Không tìm thấy giỏ hàng theo user");

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index !== -1) {
      cart.items[index].quantity = quantity;
    } else
      throw new ResourceNotFoundException(
        "Không tìm thấy sản phẩm trong giỏ hàng"
      );

    return await cart.save();
  };

  static deleteCart = async (req) => {
    const { productId, userId } = req.params;

    const cart = await Cart.findOne({
      userId: userId,
    });
    if (!cart)
      throw new ResourceNotFoundException("Không tìm thấy giỏ hàng theo user");

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index !== -1) {
      cart.items.pull({ productId });
    } else
      throw new ResourceNotFoundException(
        "Không tìm thấy sản phẩm trong giỏ hàng"
      );

    return await cart.save();
  };

  static getCartByUser = async (req) => {
    const { userId } = req.params;
    const cart = await Cart.findOne({
      userId: userId,
    });
    if (!cart)
      throw new ResourceNotFoundException("Không tìm thấy giỏ hàng theo user");

    return cart;
  };
}

module.exports = CartService;
