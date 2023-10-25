import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useContext, useEffect } from "react";
import { Context } from "index";
import { observer } from "mobx-react-lite";
import Login from "Components/Pages/Login";
import PrivateRoute from "Components/route/PrivateRoute";
import CreateQr from "Components/Pages/CreateQr";
import ErrorPage from "Components/Pages/ErrorPage";
import CheckProduct from "Components/Pages/CheckProduct";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckProduct />} />
        <Route path="/login" element={<Login />} />

        <Route path="/user" element={<PrivateRoute />}>
          <Route path="/user/create-qr" element={<CreateQr />} />
          {/* <Route path=":id" element={<UserPage />} /> */}
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );

  // <RouterProvider router={router} />;
}

export default observer(App);
