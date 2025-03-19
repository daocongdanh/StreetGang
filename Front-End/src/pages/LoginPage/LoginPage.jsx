import React from "react";
import { login } from "../../services/userService";
import { useMessage } from "../../contexts/MessageContext";
import { useNavigate } from "react-router";
export default function Login() {
  const { success, error } = useMessage();
  const navigate = useNavigate();
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const loginData  = {
        phone, password
      };
      const response = await login(loginData );
      console.log("Login response:", response); // Kiểm tra response từ API
      localStorage.setItem("user", JSON.stringify(response.data));
      success("Đăng nhập thành công");
      navigate("/");
    } catch (err) {
      error(err.response.data.message);
    }
  };

  return (
    <div className="min-h-[80vh] pt-6 flex justify-center items-center">
      <div className="bg-white max-w-2xl w-full p-10 shadow-md rounded-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-medium relative inline-block pb-2">
            Đăng nhập
            <span className="block w-14 h-1 bg-black mt-2 mx-auto"></span>
          </h1>
        </div>
        <form onSubmit={handleClick}>
          <div className="mb-6">
            <input
              id="phone"
              name="phone"
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              required
              autoComplete="phone"
              className="w-full h-14 px-5 text-gray-600 font-medium border border-transparent bg-[#ededed] outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-6">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
              autoComplete="current-password"
              className="w-full h-14 px-5 text-gray-600 font-medium border border-transparent bg-[#ededed] outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="text-gray-500 text-s mb-6">
            This site is protected by reCAPTCHA and the Google&nbsp;
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </a>
            &nbsp;and&nbsp;
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Terms of Service&nbsp;
            </a>
            apply.
          </div>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              type="submit"
              className="bg-black text-white border border-black px-5 py-2 text-md font-medium transition-all hover:bg-white hover:text-black"
            >
              ĐĂNG NHẬP
            </button>
            <div className="text-sm text-gray-600">
              <a href="#" className="hover:text-gray-500">Quên mật khẩu?</a>
              <br />
              &nbsp;&ensp;hoặc <a href="#" className="hover:text-gray-500">Đăng ký</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
