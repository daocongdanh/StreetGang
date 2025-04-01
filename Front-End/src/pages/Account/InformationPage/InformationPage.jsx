import React, { useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import { getUserById, updateUser } from "../../../services/userService";
import { useMessage } from "../../../contexts/MessageContext";

export default function InformationPage() {
  const { success, error } = useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("user"));
    const fetchApi = async () => {
      const userResponse = await getUserById(storedUserInfo.userId);
      const user = userResponse.data;

      const defaultAddress = user.address?.find((addr) => addr.isDefault) || {};
      setUserInfo({
        id: user.userId || "",
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: defaultAddress.detail || "Chưa có địa chỉ mặc định",
      });
    };
    fetchApi();
  }, []);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (userInfo) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(09|03|05)\d{8}$/;

    if (!userInfo.fullName.trim()) {
      error("Họ và tên không được để trống.");
      return false;
    }
    if (!emailRegex.test(userInfo.email)) {
      error("Email không hợp lệ.");
      return false;
    }
    if (!phoneRegex.test(userInfo.phone)) {
      error(
        "Số điện thoại không hợp lệ. Phải có 10 số và bắt đầu bằng 09, 03 hoặc 05."
      );
      return false;
    }

    return true;
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!validateForm(userInfo)) return;
    try {
      setIsLoading(true);
      const response = await updateUser(userInfo.id, {
        fullName: userInfo.fullName,
        email: userInfo.email,
        phone: userInfo.phone,
      });

      if (response.code === 200) {
        const storedUserInfo = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...storedUserInfo,
            fullName: userInfo.fullName,
            email: userInfo.email,
            phone: userInfo.phone,
          })
        );
        success("Cập nhật thông tin thành công!");
      } else {
        error("Cập nhật thất bại. Vui lòng thử lại!");
      }
    } catch (err) {
      error(
        err.response?.data?.message || "Cập nhật thất bại. Vui lòng thử lại!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdateUser}
      className="bg-white py-[30px] px-[80px] min-h-[600px] rounded-[15px]  text-center"
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
        <div className="col-span-7 flex">
          <Button title="Cập nhật" loading={isLoading} />
        </div>
      </div>
    </form>
  );
}
