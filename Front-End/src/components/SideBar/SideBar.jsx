import { Outlet, NavLink } from "react-router";
import {
  AimOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

const SideBar = () => {
  const menu = [
    { icon: <UserOutlined />, link: "/account", title: "Tài khoản của bạn" },
    {
      icon: <AimOutlined />,
      link: "/account/address",
      title: "Địa chỉ của bạn",
    },
    {
      icon: <ShoppingOutlined />,
      link: "/account/order",
      title: "Lịch sử mua hàng",
    },
    { icon: <LogoutOutlined />, link: "/logout", title: "Thoát tài khoản" },
  ];

  return (
    <div className="flex py-10">
      {/* Sidebar Menu */}
      <ul className="bg-white w-[280px] mr-8 rounded-xl border border-gray-200 shadow-lg p-5 min-h-[600px]">
        {menu.map((item, index) => (
          <li key={index} className="mb-4">
            <NavLink
              to={item.link}
              end={item.link === "/account"}
              className={({ isActive }) =>
                `flex items-center p-3 font-semibold rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gray-200 text-black font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="ml-4">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Nội dung bên phải */}
      <div className="flex-1 bg-white rounded-xl shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
