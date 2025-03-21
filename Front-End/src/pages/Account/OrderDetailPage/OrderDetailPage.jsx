import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOrderById } from "../../../services/orderService";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await getOrderById(orderId);
        if (response.code === 200) {
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
  };

  if (!order) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Đang tải chi tiết đơn hàng...
      </div>
    );
  }

  return (
    <div className="bg-white py-8 px-20 rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Chi tiết đơn hàng
      </h1>
      <div className="mb-6 p-6 bg-gray-100 rounded-lg grid grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-600">
            Ngày đặt hàng:
          </h3>
          <p className="text-lg font-semibold">
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-600">Trạng thái:</h3>
          <span className="text-lg font-semibold">
            {order.orderStatus === "Pending" ? "Chờ xác nhận" : "Hoàn thành"}
          </span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-600">Tổng tiền:</h3>
          <p className="text-lg font-semibold">
            {formatCurrency(order.totalAmount)}
          </p>
        </div>
      </div>

      <div className="p-6 border border-gray-300 rounded-lg">
        <h3 className="text-xl font-semibold">
          Sản phẩm ({order.items.length})
        </h3>
        <div className="mt-4 space-y-4">
          {order.items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center space-x-6 ${
                i !== order.items.length - 1
                  ? "border-b border-gray-300 pb-4"
                  : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-lg shadow"
              />
              <div>
                <h4 className="font-semibold text-lg">
                  {item.name} x {item.quantity}
                </h4>
                <p className="text-gray-700">
                  Giá: {formatCurrency(item.price)}
                </p>
                <p className="text-gray-500">
                  Size: {item.size} | Màu: {item.color}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border border-gray-300 rounded-lg mt-6">
        <h3 className="text-xl font-semibold">Thông tin giao hàng</h3>
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div>
            <p className="font-semibold text-gray-600">Địa chỉ:</p>
            <p className=" font-semibold">{order.address}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Phí vận chuyển:</p>
            <p className="font-semibold">{formatCurrency(order.fee)}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">
              Phương thức thanh toán:
            </p>
            <p className=" font-semibold">{order.paymentMethod.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
