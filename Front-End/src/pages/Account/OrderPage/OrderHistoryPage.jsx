import React from "react";
import Button from "../../../components/Button/Button";
const orders = [
  {
    orderNo: "10000",
    shippedDate: "2024-03-02",
    status: "In Processing",
    amount: "$1024",
    images: ["/ao1.jpg", "/ao2.png", "/ao3.webp"],
    moreCount: 2,
  },
  {
    orderNo: "10001",
    shippedDate: "2024-03-02",
    status: "Awaiting Delivery",
    amount: "$123",
    images: ["/ao4.jpg", "/ao5.jpg", "/ao6.jpg"],
    moreCount: 3,
  },
];

export default function OrderPage() {
  return (
    <div className="bg-white py-6 px-16 min-h-screen rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-center">Order List</h2>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="p-6  border-1 border-gray-200 shadow-md bg-white h-[300px]">
            <div className="grid grid-cols-4 gap-4 bg-gray-200 p-4 rounded-md">
              <div><strong>ORDER NO:</strong> <br /> {order.orderNo}</div>
              <div><strong>SHIPPED DATE:</strong> <br /> {order.shippedDate}</div>
              <div><strong>STATUS:</strong> <br /> {order.status}</div>
              <div><strong>ORDER AMOUNT:</strong> <br /> {order.amount}</div>
            </div>
            <div className="flex items-center justify-between gap-4 mt-4">
              <div className="flex items-center gap-4">
                {order.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Product"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
                <div className="w-20 h-20 bg-gray-200 flex flex-col items-center justify-center border border-gray-200 rounded-md text-sm font-medium tabular-nums">
                    <span>+{order.moreCount}</span>
                    <span>more</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button title="Order Details" />
                <Button title="Track Order" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}