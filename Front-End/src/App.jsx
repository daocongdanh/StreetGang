import { useRoutes } from "react-router";
import "./App.css";

import CartPage from "./pages/CartPage/CartPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import LayoutClient from "./layouts/LayoutClient";
import BlogPage from "./pages/BlogPage/BlogPage";
import SalePage from "./pages/SalePage/SalePage";
import SideBar from "./components/SideBar/SideBar";
import OrderPage from "./pages/Account/OrderPage/OrderHistoryPage";
import InformationPage from "./pages/Account/InformationPage/InformationPage";
import AddressPage from "./pages/Account/AddressPage/AddressPage";
import OrderDetailPage from "./pages/Account/OrderDetailPage/OrderDetailPage";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <LayoutClient />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "blog",
          element: <BlogPage />,
        },
        {
          path: "sale",
          element: <SalePage />,
        },
        {
          path: "collections",
          element: <CategoryPage />,
        },
        {
          path: "products/:slug",
          element: <ProductPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "account",
          element: <SideBar />,
          children: [
            {
              path: "",
              element: <InformationPage />,
            },
            {
              path: "order",
              element: <OrderPage />,
            },
            {
              path: "order-detail/:orderId",
              element: <OrderDetailPage />,
            },
            {
              path: "address",
              element: <AddressPage />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return element;
}

export default App;
