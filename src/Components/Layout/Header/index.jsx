import logo from "assets/images/Logo.svg";
import user from "assets/images/icons/avatar.svg";
import logout from "assets/images/icons/logout.svg";
import "./style.css";
import { useContext, useState } from "react";
import { Context } from "index";
import { Link } from "react-router-dom";
const Header = (props) => {
  const { store } = useContext(Context);

  return (
    <header className="header container">
      <Link to="/">
        <img src={logo} alt="maneken" />
      </Link>
      {props.isAdmin ? (
        <div className="header__info">
          <div className="user-block">
            <img className="user-block__avatar" src={user} alt="" />
            <h3 className="user-block__user">Администратор</h3>
          </div>
          <div className="user-block__log-out" onClick={() => store.logout()}>
            <img src={logout} alt="" />
          </div>
        </div>
      ) : (
        <Link to="/login">
          <h3 className="user-block__user">Администратор</h3>
        </Link>
      )}
    </header>
  );
};

export { Header };
