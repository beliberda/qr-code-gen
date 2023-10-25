import logo from "assets/images/Logo.svg";
import user from "assets/images/icons/avatar.svg";
import logout from "assets/images/icons/logout.svg";
import "./style.css";
import { useContext } from "react";
import { Context } from "index";
const Header = () => {
  const { store } = useContext(Context);
  return (
    <header className="header container">
      <img src={logo} alt="maneken" />
      {store.isAuth ? (
        <div className="header__info">
          <div className="user-block">
            <img className="user-block__avatar" src={user} alt="" />
            <h3 className="user-block__user">Администратор</h3>
          </div>
          <div className="user-block__log-out" onClick={() => store.logout}>
            <img src={logout} alt="" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
};

export { Header };
