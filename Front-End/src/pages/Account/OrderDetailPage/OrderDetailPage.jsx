import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOrderById } from "../../../services/orderService";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await getOrderById(orderId); // 🛠 GỌI API ĐÚNG HÀM `getOrderById`
        if (response.code === 200) {
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (!order) {
    return <div className="text-center py-10">Loading order details...</div>;
  }

  return (
    <div className="bg-white py-5 px-20 min-h-[600px] rounded-lg border border-gray-200">
      <div className="mb-6 p-4 bg-gray-200 rounded-lg grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-600">ORDER NO:</h2>
          <p className="text-lg font-semibold">{order.orderId}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-600">SHIPPED DATE:</h2>
          <p className="text-lg font-semibold">{order.updatedAt}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-600">STATUS:</h2>
          <p className="text-lg font-semibold">{order.orderStatus}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-600">ORDER AMOUNT:</h2>
          <p className="text-lg font-semibold">${order.totalAmount}</p>
        </div>
      </div>
      
      {/* Danh sách sản phẩm trong đơn hàng */}
      <div className="p-4 border border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold">Order Items ({order.items.length})</h3>
        <div className="mt-4 space-y-4">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center space-x-4 border-b border-gray-300 pb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
              <div>
                <h4 className="font-semibold">{item.name} x {item.quantity}</h4>
                <p>${item.price}</p>
                <p>Size: {item.size} | Color: {item.color}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tổng tiền đơn hàng */}
      <div className="p-4 border border-gray-300 rounded-lg mt-6">
        <h3 className="text-lg font-semibold">Order Total</h3>
        <div className="mt-2">
          <div className="flex justify-between border-b border-gray-300 py-2">
            <span>Subtotal</span>
            <span className="font-semibold">${order.subtotal}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 py-2">
            <span>Tax</span>
            <span className="font-semibold">${}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 py-2">
            <span>Shipping</span>
            <span className="font-semibold">${order.fee}</span>
          </div>
          <div className="flex justify-between py-2 text-xl font-bold">
            <span>Total</span>
            <span>${order.totalAmount}</span>
          </div>
        </div>
      </div>
      
      {/* Thông tin giao hàng */}
      <div className="p-4 border border-gray-300 rounded-lg mt-6">
        <h3 className="text-lg font-semibold">Shipping Information</h3>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div>
            <p className="font-semibold">Billing Address:</p>
            <p>{order.address}</p>
          </div>
          <div>
            <p className="font-semibold">Shipping Address:</p>
            <p>{order.address}</p>
          </div>
          <div>
            <p className="font-semibold">Shipping Method:</p>
            <p>{order.shippingMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
