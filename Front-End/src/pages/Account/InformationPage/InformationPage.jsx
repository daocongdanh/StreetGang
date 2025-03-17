import React, { useState, useEffect } from "react";
import Button from "../../../components/Button/Button";

export default function InformationPage() {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("user"));
    if (storedUserInfo) {
      const defaultAddress = storedUserInfo.address?.find(addr => addr.isDefault) || {};
      setUserInfo({
        fullName: storedUserInfo.fullName,
        email: storedUserInfo.email,
        phone: storedUserInfo.phone,
        address: defaultAddress.detail || "Chưa có địa chỉ mặc định",
      });
    }
  }, []);

  return (
    <div className="bg-white py-[20px] px-[80px] min-h-[600px] rounded-[15px] border-[1px] border-gray-200 text-center">
      {[
        { label: "Họ và tên:", value: userInfo.fullName, type: "text" },
        { label: "Email:", value: userInfo.email, type: "email" },
        { label: "Số điện thoại:", value: userInfo.phone, type: "tel" },
      ].map((field, index) => (
        <div key={index} className="mb-4 grid grid-cols-10 items-center">
          <label className="text-gray-700 font-semibold text-left pr-4 col-span-2 h-full flex items-center">
            {field.label}
          </label>
          <input
            type={field.type}
            className="col-span-7 p-2 border border-gray-300 rounded w-full"
            value={field.value}
            readOnly
          />
        </div>
      ))}

      <div className="mb-4 grid grid-cols-10 items-center">
        <label className="text-gray-700 font-semibold text-left pr-4 col-span-2 h-full flex items-center">
          Địa chỉ:
        </label>
        <input
          type="text"
          className="col-span-7 p-2 border border-gray-300 rounded w-full bg-gray-100 cursor-not-allowed"
          value={userInfo.address}
          readOnly
        />
      </div>

      <div className="grid grid-cols-10">
        <div className="col-span-2"></div>
        <Button title="Cập nhật" className="col-span-7 w-full rounded-lg" />
      </div>
    </div>
  );
}
