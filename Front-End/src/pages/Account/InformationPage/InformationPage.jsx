import React, { useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import { updateUser } from "../../../services/userService";
import { useMessage } from "../../../contexts/MessageContext";

export default function InformationPage() {
  const { success, error } = useMessage();
  const [userInfo, setUserInfo] = useState({
    id: "",
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
        id: storedUserInfo.userId || "",  
        fullName: storedUserInfo.fullName || "",
        email: storedUserInfo.email || "",
        phone: storedUserInfo.phone || "",
        address: defaultAddress.detail || "Chưa có địa chỉ mặc định",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault(); 
    try {
      const response = await updateUser(userInfo.id, {
        fullName: userInfo.fullName,
        email: userInfo.email,
        phone: userInfo.phone
      });

      if (response.code === 200) {
        const storedUserInfo = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("user", JSON.stringify({
          ...storedUserInfo,
          fullName: userInfo.fullName,
          email: userInfo.email,
          phone: userInfo.phone
        }));
        success("Cập nhật thông tin thành công!");
      } else {
        error("Cập nhật thất bại. Vui lòng thử lại!");
      }
    } catch (err) {
      error("Cập nhật thất bại. Vui lòng thử lại!");
      console.error("Lỗi cập nhật:", err);
    }
  };

  return (
    <form
      onSubmit={handleUpdateUser}
      className="bg-white py-[20px] px-[80px] min-h-[600px] rounded-[15px] border-[1px] border-gray-200 text-center"
    >
      {[ 
        { label: "Họ và tên:", name: "fullName", type: "text" },
        { label: "Email:", name: "email", type: "email" },
        { label: "Số điện thoại:", name: "phone", type: "tel" },
      ].map((field, index) => (
        <div key={index} className="mb-4 grid grid-cols-10 items-center">
          <label className="text-gray-700 font-semibold text-left pr-4 col-span-2 h-full flex items-center">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            className="col-span-7 p-2 border border-gray-300 rounded w-full"
            value={userInfo[field.name]}
            onChange={handleChange}
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
    </form>
  );
}
