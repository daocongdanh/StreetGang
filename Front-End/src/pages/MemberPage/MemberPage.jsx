import React from "react";
import { login } from "../../services/userService";
import { useMessage } from "../../contexts/MessageContext";
export default function MemberPage() {
  const { success, error } = useMessage();
  const handleClick = async () => {
    try {
      const response = await login({
        phone: "0123123123",
        password: "123456",
      });
      success(response.message);
    } catch (err) {
      error(err.response.data.message);
    }
  };
  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
