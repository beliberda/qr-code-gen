import CheckInfo from "Components/Pages/CheckInfo";
import CheckProduct from "Components/Pages/CheckProduct";
import CreateQr from "Components/Pages/CreateQr";
import ErrorPage from "Components/Pages/ErrorPage";
import ListProducts from "Components/Pages/ListProduct";

const { default: Login } = require("Components/Pages/Login");
const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product-info",
    element: <CheckInfo />,
  },
  {
    path: "/check",
    element: <CheckProduct />,
  },
  {
    path: "/create-qr",
    element: <CreateQr />,
  },
  {
    path: "/products",
    element: <ListProducts />,
  },
]);

export { router };
