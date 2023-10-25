import { Navigate, Outlet, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "index";

const PrivateRoute = (props) => {
  const { store } = useContext(Context);
  //   if (store.isLoadingAuth) {
  //     return <div>Checking auth...</div>;
  //   }
  if (store.isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default observer(PrivateRoute);
