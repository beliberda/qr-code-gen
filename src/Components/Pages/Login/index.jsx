import { Banner } from "Components/UI/banner";
import "./style.css";
import { Header } from "Components/Layout/Header";
import { useContext, useEffect, useState } from "react";
import { Context } from "index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function Login(params) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);
  // Навигация
  const navigate = useNavigate();
  const NavUser = () => {
    navigate("/user/1");
  };

  // useEffect(() => {
  //   if (store.isAuth) {
  //     NavUser();
  //   }
  // }, []);

  return (
    <>
      <Header isAdmin={false} />
      <Banner title="QR-код" titleSpan="Генератор" />
      <main className="login-auth container">
        <div className="login-auth__form">
          <div className="input-block">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              value={email}
              className="input-id"
              placeholder="Логин или E-mail"
            />
          </div>
          <div className="input-block">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              value={password}
              className="input-id"
              placeholder="Пароль"
            />
          </div>
          <button
            onClick={() => {
              store.login(email, password);
              if (store.isAuth) {
                NavUser();
              }
            }}
            className="button-enter"
          >
            Войти
          </button>
          {/* <button
            onClick={() => store.registration(email, password)}
            className="button-enter"
          >
            Регистрация
          </button> */}
        </div>
      </main>
    </>
  );
}
export default observer(Login);
