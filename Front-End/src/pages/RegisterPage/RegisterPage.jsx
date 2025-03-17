import React, { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../../services/userService";
import { useMessage } from "../../contexts/MessageContext";
import Button from "../../components/Button/Button";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { success, error } = useMessage(); 
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      error("Mật khẩu nhập lại không khớp.");
      return;
    }

    try {
      const response = await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.code === 201) {
        success("Đăng ký thành công!");
        navigate("/login");
      } else {
        error("Đăng ký thất bại! Vui lòng thử lại.");
      }
    } catch (err) {
      error(err.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="p-8">
      <div className="p-8 bg-white rounded-lg border border-gray-300 w-[600px] mx-auto text-center">
        <h1 className="text-2xl font-semibold mb-2">Tạo tài khoản</h1>
        <div className="w-16 h-[3px] bg-black mx-auto mb-10"></div>

        <form onSubmit={handleSubmit}>
          {[
            { name: "fullName", placeholder: "Họ và tên", type: "text" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "phone", placeholder: "Số điện thoại", type: "tel" },
            { name: "password", placeholder: "Mật khẩu", type: "password" },
            { name: "confirmPassword", placeholder: "Nhập lại mật khẩu", type: "password" },
          ].map((field, index) => (
            <input
              key={index}
              name={field.name}
              type={field.type}
              className="w-full p-3 mb-4 bg-gray-100 rounded"
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          ))}

          <p className="text-gray-600 text-sm text-left">
            Bạn đã có tài khoản?{" "}
            <a href="/login" className="text-black font-semibold">
              Đăng nhập
            </a>
          </p>

          <Button title="Đăng ký" type="submit" />
        </form>
      </div>
    </div>
  );
}
