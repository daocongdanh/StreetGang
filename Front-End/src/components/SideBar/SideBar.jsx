import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import {
  AimOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMessage } from "../../contexts/MessageContext";

const SideBar = () => {
  const { success } = useMessage();
  const navigate = useNavigate();
  const location = useLocation();

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
      isOrderPage: true,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    success("Đăng xuất thành công!");
    navigate("/login");
  };

  return (
    <div className="flex py-10">
      <ul className="bg-white w-[280px] mr-8 rounded-xl border border-gray-200 shadow-lg p-5 min-h-[600px]">
        {menu.map((item, index) => {
          const isActive =
            item.isOrderPage && location.pathname.startsWith("/account/order")
              ? true
              : location.pathname === item.link;

          return (
            <li key={index} className="mb-4">
              <NavLink
                to={item.link}
                className={`flex items-center p-3 font-semibold rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gray-200 text-black font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="ml-4">{item.title}</span>
              </NavLink>
            </li>
          );
        })}
        <li
          className="flex items-center p-3 font-semibold rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          onClick={handleLogout}
        >
          <span className="text-xl">
            <LogoutOutlined />
          </span>
          <span className="ml-4">Thoát tài khoản</span>
        </li>
      </ul>

      <div className="flex-1 bg-white rounded-xl shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
