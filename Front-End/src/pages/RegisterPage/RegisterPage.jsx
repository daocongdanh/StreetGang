import React from "react";
import Button from "../../components/Button/Button";

export default function RegisterPage() {
  return (
    <div className="p-8">
      <div className="p-8 bg-white rounded-lg border border-gray-300 w-[600px] mx-auto text-center">
        <h1 className="text-2xl font-semibold mb-2">Tạo tài khoản</h1>
        <div className="w-16 h-[3px] bg-black mx-auto mb-10"></div>

        {[
          { placeholder: "Họ và tên", type: "text" },
          { placeholder: "Email", type: "email" },
          { placeholder: "Số điện thoại", type: "tel" },
          { placeholder: "Mật khẩu", type: "password" },
          { placeholder: "Nhập lại mật khẩu", type: "password" },
        ].map((field, index) => (
          <input
            key={index}
            type={field.type}
            className="w-full p-3 mb-6 border-none bg-gray-100 rounded"
            placeholder={field.placeholder}
          />
        ))}

        <p className="text-gray-600 text-sm text-left">
          Bạn đã có tài khoản?{" "}
          <a href="" className="text-black font-semibold">
            Đăng nhập
          </a>
        </p>

        <Button title="Đăng ký" />
      </div>
    </div>
  );
}
