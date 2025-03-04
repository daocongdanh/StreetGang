import { Outlet, NavLink } from "react-router";
import {
  AimOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
const SideBar = () => {
  const menu = [
    {
      icon: <UserOutlined />,
      link: "/account",
      title: "Tài khoản của bạn",
    },
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

    {
      icon: <LogoutOutlined />,
      link: "/logout",
      title: "Thoát tài khoản",
    },
  ];
  return (
    <div className="flex py-[40px]">
      <ul className="bg-white w-[25%] mr-[30px] rounded-[15px] border-[1px] border-gray-200 p-[15px] min-h-[600px]">
        {menu.map((item, index) => (
          <li
            key={index}
            className={`text-[18px] ${
              index !== menu.length - 1 ? "mb-[15px]" : ""
            }`}
          >
            <NavLink
              to={item.link}
              end={item.link === "/account"}
              className="sidebar flex items-center px-[5px] pt-[3px] rounded-[8px] border-[1px] border-transparent"
            >
              {item.icon}
              <span className="ml-[20px]">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
