import LayoutClient from "../layouts/LayoutClient";
import HomePage from "../pages/HomePage/HomePage";
import CartPage from "../pages/CartPage/CartPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import BlogPage from "../pages/BlogPage/BlogPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SideBar from "../components/SideBar/SideBar";
import InformationPage from "../pages/Account/InformationPage/InformationPage";
import OrderPage from "../pages/Account/OrderPage/OrderHistoryPage";
import OrderDetailPage from "../pages/Account/OrderDetailPage/OrderDetailPage";
import AddressPage from "../pages/Account/AddressPage/AddressPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import MemberPage from "../pages/MemberPage/MemberPage";
import PaymentStatus from "../pages/PaymentStatus/PaymentStatus";
import { useRoutes } from "react-router";

import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

export default function useRouteElement() {
  const routes = [
    {
      path: "/",
      element: <LayoutClient />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "member", element: <MemberPage /> },
        { path: "collections", element: <CategoryPage /> },
        { path: "products/:slug", element: <ProductPage /> },
        { path: "search", element: <SearchPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "*", element: <NotFoundPage /> },

        {
          element: <PrivateRoute />,
          children: [
            { path: "cart", element: <CartPage /> },
            { path: "checkout", element: <CheckoutPage /> },
            { path: "payment-status/:status", element: <PaymentStatus /> },
            {
              path: "account",
              element: <SideBar />,
              children: [
                { path: "", element: <InformationPage /> },
                { path: "order", element: <OrderPage /> },
                { path: "order-detail/:orderId", element: <OrderDetailPage /> },
                { path: "address", element: <AddressPage /> },
              ],
            },
          ],
        },
      ],
    },
  ];

  return useRoutes(routes);
}
