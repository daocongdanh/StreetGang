const ResponseSuccess = require("../responses/success.response");
const OrderService = require("../services/order.service");
const StatusCode = require("../utils/httpStatusCode");

class OrderController {
  static createOrder = async (req, res) => {
    new ResponseSuccess(
      StatusCode.CREATED,
      "Tạo đơn hàng thành công",
      await OrderService.createOrder(req)
    ).send(res);
  };

  static vnpayCallBack = async (req, res) => {
    await OrderService.vnpayCallBack(req, res);
  };

  static getOrderByUser = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy danh sách đơn hàng theo user thành công",
      await OrderService.getOrderByUser(req)
    ).send(res);
  };

  static getOrderById = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy đơn hàng theo id thành công",
      await OrderService.getOrderById(req)
    ).send(res);
  };
}

module.exports = OrderController;
