import { Navigate, Outlet, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "index";

const PrivateRoute = () => {
  const { store } = useContext(Context);

  if (store.isAuth || localStorage.getItem("token")) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default observer(PrivateRoute);
