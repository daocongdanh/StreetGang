import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { getOrderByUser } from "../../../services/orderService";
import { Link, useNavigate, useLocation } from "react-router";
import { Pagination } from "antd";

export default function OrderPage() {
  const [orders, setOrders] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.userId) return;

      const page = location.search.split("=")[1];

      try {
        const response = await getOrderByUser(user.userId, page);
        if (response.code === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [location.search]);
  const handleChange = (page) => {
    setCurrentPage(page);
    searchParams.set("page", page);
    const url = `${pathName}?${searchParams.toString()}`;
    navigate(url);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
  };

  return (
    <div className="bg-white py-8 px-20 rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Lịch sử mua hàng
      </h1>
      <div className="space-y-8">
        {orders &&
          orders.result.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className=" text-gray-600 font-medium">
                    Mã đơn hàng: #{index + 1}
                  </p>
                  <p className=" text-gray-600">
                    Ngày đặt hàng:{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-4 py-2  font-semibold rounded-full ${
                    order.orderStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.orderStatus === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.orderStatus === "Pending"
                    ? "Chờ xác nhận"
                    : "Hoàn thành"}
                </span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-6">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-lg  font-medium text-gray-600">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <Link to={`/account/order-detail/${order._id}`}>
                  <Button
                    title="Xem chi tiết"
                    className="bg-blue-600 hover:bg-blue-700 text-white  px-6 py-3"
                  />
                </Link>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className=" text-gray-700">
                  Tổng tiền:{" "}
                  <span className="font-semibold ">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </p>
              </div>
            </div>
          ))}
        {orders && orders.totalItem > 0 && (
          <Pagination
            align="center"
            current={currentPage}
            defaultCurrent={1}
            total={orders.totalItem}
            showSizeChanger={false}
            pageSize={2}
            style={{
              marginTop: 20,
            }}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}
