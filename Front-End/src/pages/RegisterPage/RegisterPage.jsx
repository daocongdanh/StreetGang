import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../../services/userService";
import { useMessage } from "../../contexts/MessageContext";
import Button from "../../components/Button/Button";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { success, error } = useMessage();
  const [isLoading, setIsLoading] = useState(false);
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

  const validateForm = () => {
    const { fullName, email, phone, password, confirmPassword } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(09|03|05)\d{8}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!fullName.trim()) {
      error("Họ và tên không được để trống.");
      return false;
    }
    if (!emailRegex.test(email)) {
      error("Email không hợp lệ.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      error(
        "Số điện thoại không hợp lệ. Phải có 10 số và bắt đầu bằng 09, 03 hoặc 05."
      );
      return false;
    }
    if (!passwordRegex.test(password)) {
      error(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      return false;
    }
    if (password !== confirmPassword) {
      error("Mật khẩu nhập lại không khớp.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="p-8 bg-white rounded-lg border border-gray-300 w-[600px] mx-auto text-center">
        <h1 className="text-3xl font-semibold mb-2">Tạo tài khoản</h1>
        <div className="w-16 h-[3px] bg-black mx-auto mb-10"></div>

        <form onSubmit={handleSubmit}>
          {[
            { name: "fullName", placeholder: "Họ và tên", type: "text" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "phone", placeholder: "Số điện thoại", type: "tel" },
            { name: "password", placeholder: "Mật khẩu", type: "password" },
            {
              name: "confirmPassword",
              placeholder: "Nhập lại mật khẩu",
              type: "password",
            },
          ].map((field, index) => (
            <input
              key={index}
              name={field.name}
              type={field.type}
              className="w-full p-3 mb-4 bg-gray-100 rounded font-semibold"
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          ))}

          <p className="text-gray-600 text-sm text-left">
            Bạn đã có tài khoản?{" "}
            <Link
              to={"/login"}
              className="text-black font-semibold hover:text-gray-500"
            >
              Đăng nhập
            </Link>
          </p>

          <Button title="Đăng ký" loading={isLoading} />
        </form>
      </div>
    </div>
  );
}
