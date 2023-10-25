import { Banner } from "Components/UI/banner";
import "./style.css";
import { Header } from "Components/Layout/Header";
import { useContext, useState } from "react";
import { Context } from "index";
import { observer } from "mobx-react-lite";

function Login(params) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);

  return (
    <>
      <Header />
      <Banner title="QR-код" titleSpan="Генератор" />
      <main className="login-auth container">
        <div className="login-auth__form">
          <div className="input-block">
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              value={username}
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
            onClick={() => store.login(username, password)}
            className="button-enter"
          >
            Войти
          </button>
          {/* <button
            onClick={() => store.registration(username, password)}
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
