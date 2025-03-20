import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { getOrderByUser } from "../../../services/orderService";
import { Link } from "react-router"; 

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.userId) return;

      try {
        const response = await getOrderByUser(user.userId);
        if (response.code === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white py-6 px-16 min-h-screen rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-center">Order List</h2>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="p-6 border-1 border-gray-200 shadow-md bg-white h-[300px]">
            <div className="grid grid-cols-4 gap-4 bg-gray-200 p-4 rounded-md">
              <div ><strong>ORDER NO:</strong> <br /> {index + 1}</div>
              <div><strong>SHIPPED DATE:</strong> <br /> {order.updatedAt}</div>
              <div><strong>STATUS:</strong> <br /> {order.orderStatus}</div>
              <div><strong>ORDER AMOUNT:</strong> <br /> ${order.totalAmount}</div>
            </div>
            <div className="flex items-center justify-between gap-4 mt-4">
              <div className="flex items-center gap-4">
                {order.items.slice(0, 3).map((item, i) => (
                  <img
                    key={i}
                    src={item.image}
                    alt="Product"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
                {order.items.length > 3 && (
                  <div className="w-20 h-20 bg-gray-200 flex flex-col items-center justify-center border border-gray-200 rounded-md text-sm font-medium tabular-nums">
                    <span>+{order.items.length - 3}</span>
                    <span>more</span>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                {/* Điều hướng đến trang chi tiết đơn hàng */}
                <Link to={`/account/order-detail/${order._id}`}>
                  <Button title="Order Details" />
                </Link>
                <Button title="Track Order" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
