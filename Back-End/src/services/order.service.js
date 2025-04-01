const querystring = require("qs");
const crypto = require("crypto");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const PaymentMethod = require("../models/paymentMethod.model");
const { OrderStatus } = require("../constants/index");
const payOS = require("../configurations/payosConfig");

const { getVNPayConfig, sortObject } = require("../configurations/vnpayConfig");

const {
  ResourceNotFoundException,
  BadRequestException,
} = require("../exceptions/global.exception");

class OrderService {
  static createOrder = async (req) => {
    const { address, totalAmount, fee, paymentMethodId, userId } = req.body;

    const user = await User.findOne({
      _id: userId,
    });
    if (!user)
      throw new ResourceNotFoundException(
        "Không tìm thấy user theo Id = " + userId
      );

    const cart = await Cart.findOne({
      userId: userId,
    });
    if (!cart)
      throw new ResourceNotFoundException("Không tìm thấy giỏ hàng theo user");

    if (cart.items.length === 0)
      throw new BadRequestException("Giỏ hàng trống");

    const paymentMethod = await PaymentMethod.findOne({
      _id: paymentMethodId,
    });

    if (!paymentMethod)
      throw new ResourceNotFoundException(
        "Không tìm thấy phương thức thanh toán theo Id: " + paymentMethodId
      );

    if (paymentMethod.name === "VNPAY") {
      var vnp_Params = getVNPayConfig(req);
      vnp_Params["vnp_ReturnUrl"] =
        process.env.VNPAY_RETURN_URL +
        `?address=${address}&fee=${fee}&payment=${paymentMethodId}&user=${userId}`;
      vnp_Params["vnp_Amount"] = totalAmount * 100;
      vnp_Params["vnp_BankCode"] = "NCB";
      vnp_Params = sortObject(vnp_Params);

      var signData = querystring.stringify(vnp_Params, { encode: false });
      var hmac = crypto.createHmac("sha512", process.env.VNPAY_SECRET_KEY);
      var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;

      return (
        process.env.VNPAY_URL +
        "?" +
        querystring.stringify(vnp_Params, { encode: false })
      );
    } else if (paymentMethod.name === "PayOS") {
      const body = {
        orderCode: Number(String(new Date().getTime()).slice(-6)),
        amount: totalAmount,
        description: "Thanh toán đơn hàng",
        cancelUrl: process.env.PAYOS_CANCEL_URL,
        returnUrl:
          process.env.PAYOS_RETURN_URL +
          `?address=${address}&fee=${fee}&payment=${paymentMethodId}&user=${userId}&totalAmount=${totalAmount}`,
      };
      const paymentLinkRes = await payOS.createPaymentLink(body);
      return paymentLinkRes.checkoutUrl;
    } else {
      const order = new Order({
        userId: userId,
        items: cart.items,
        address: address,
        totalAmount: totalAmount,
        fee: fee,
        paymentMethod: paymentMethodId,
        orderStatus: OrderStatus.PENDING,
        orderDate: new Date(),
      });
      await order.save();

      cart.items = [];
      await cart.save();

      return order;
    }
  };

  static payOsSuccess = async (req, res) => {
    const { address, fee, payment, user, totalAmount } = req.query;
    const cart = await Cart.findOne({
      userId: user,
    });
    const order = new Order({
      userId: user,
      items: cart.items,
      address: address,
      totalAmount: totalAmount,
      fee: fee,
      paymentMethod: payment,
      orderStatus: OrderStatus.PENDING,
      orderDate: new Date(),
    });
    await order.save();

    cart.items = [];
    await cart.save();

    return res.redirect(`http://localhost:5173/payment-status/00`);
  };

  static payOsCancel = async (req, res) => {
    return res.redirect(`http://localhost:5173/payment-status/02`);
  };

  static vnpayCallBack = async (req, res) => {
    const { address, fee, payment, user, vnp_Amount, vnp_TransactionStatus } =
      req.query;

    if (vnp_TransactionStatus === "00") {
      const cart = await Cart.findOne({
        userId: user,
      });

      const order = new Order({
        userId: user,
        items: cart.items,
        address: address,
        totalAmount: parseInt(vnp_Amount) / 100,
        fee: fee,
        paymentMethod: payment,
        orderStatus: OrderStatus.PENDING,
        orderDate: new Date(),
      });
      await order.save();

      cart.items = [];
      await cart.save();
    }

    return res.redirect(
      `http://localhost:5173/payment-status/${vnp_TransactionStatus}`
    );
  };

  static getOrderByUser = async (req) => {
    const { userId } = req.params;

    var totalItem = await Order.countDocuments({ userId });

    const limit = 2;
    var page = parseInt(req.query.page || 0);
    page = page > 0 ? page - 1 : page;

    const totalPage = Math.ceil(totalItem / limit);
    const skipCount = page * limit;

    const user = await User.findById(userId);
    if (!user)
      throw new ResourceNotFoundException(
        "Không tìm thấy user theo Id = " + userId
      );

    const orders = await Order.find({ userId })
      .sort({ orderDate: -1 })
      .skip(skipCount)
      .limit(limit);

    return {
      page: page + 1,
      limit,
      totalPage,
      totalItem,
      result: orders,
    };
  };

  static getOrderById = async (req) => {
    const { id } = req.params;
    const order = await Order.findOne({
      _id: id,
    }).populate("paymentMethod");

    if (!order) {
      throw new ResourceNotFoundException(
        "Không tìm thấy order theo Id = " + id
      );
    }
    return order;
  };
}

module.exports = OrderService;
