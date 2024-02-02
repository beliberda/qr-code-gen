import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";

import { observer } from "mobx-react-lite";
import Login from "Components/Pages/Login";
import PrivateRoute from "Components/route/PrivateRoute";
import CreateQr from "Components/Pages/CreateQr";
import ErrorPage from "Components/Pages/ErrorPage";
import CheckProduct from "Components/Pages/CheckProduct";
import ProductInfo from "Components/Pages/ProductInfo";
import ListProducts from "Components/Pages/ListProduct";
import NotFound from "Components/Pages/NotFound";

function App() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<CheckProduct />} />
        <Route path="/checking" element={<CheckProduct />} />
        <Route path="/login" element={<Login />} />

        <Route path="/checking/product/" element={<ProductInfo />} />

        <Route path="/user" element={<PrivateRoute />}>
          <Route path="/user/:id" element={<ListProducts />} />
          <Route path="/user/:id/create-qr" element={<CreateQr />} />
        </Route>
        <Route path="/notfound/" element={<NotFound />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );

  // <RouterProvider router={router} />;
}

export default observer(App);
