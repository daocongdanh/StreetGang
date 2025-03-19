import React from "react";
import { Button } from "antd";
import { login } from "../../services/userService";
import { useMessage } from "../../contexts/MessageContext";
import { useNavigate } from "react-router";
export default function MemberPage() {
  const { success, error } = useMessage();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const data = {
        phone: "0123123123",
        password: "123456",
      };
      const response = await login(data);
      localStorage.setItem("user", JSON.stringify(response.data));
      success("Đăng nhập thành công");
      navigate("/");
    } catch (err) {
      error(err.response.data.message);
    }
  };
  return (
    <div>
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
}
