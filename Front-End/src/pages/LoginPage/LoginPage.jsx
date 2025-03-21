import React, { useState } from "react";
import { login } from "../../services/userService";
import { useMessage } from "../../contexts/MessageContext";
import { useNavigate, Link } from "react-router";
import Button from "../../components/Button/Button";
export default function Login() {
  const { success, error } = useMessage();
  const navigate = useNavigate();
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const loginData = {
        phone,
        password,
      };
      const response = await login(loginData);
      localStorage.setItem("user", JSON.stringify(response.data));
      success("Đăng nhập thành công");
      navigate("/");
    } catch (err) {
      error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10 flex justify-center items-center">
      <div className="bg-white max-w-2xl w-full p-10 shadow-md rounded-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-medium relative inline-block pb-2">
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
              placeholder="Số điện thoại"
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
            <Button title={"Đăng nhập"} loading={isLoading} />
            <div className="text-sm text-gray-600">
              <a
                href="#"
                className="hover:text-gray-500 text-black font-semibold"
              >
                Quên mật khẩu?
              </a>
              <br />
              &nbsp;&ensp;hoặc{" "}
              <Link
                to={"/register"}
                className="text-black font-semibold hover:text-gray-500"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
