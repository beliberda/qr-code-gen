import "./App.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { router } from "Components/route/route";
import { useContext, useEffect } from "react";
import { Context } from "index";
import { observer } from "mobx-react-lite";
import Login from "Components/Pages/Login";

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
        <Route path="/" element={Login} />
      </Routes>
    </BrowserRouter>
  );

  // <RouterProvider router={router} />;
}

export default observer(App);
