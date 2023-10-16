import { Banner } from "Components/UI/banner";
import "./style.css";
import { Header } from "Components/Layout/Header";
import { Input } from "Components/UI/input";
import { ButtonEnter } from "Components/UI/buttons";
import { Link } from "react-router-dom";

export default function Login(params) {
  return (
    <>
      <Header />
      <Banner title="QR-код" titleSpan="Генератор" />
      <main className="login-auth container">
        <div className="login-auth__form">
          <Input type="text" placeholder="Логин или E-mail" />
          <Input type="password" placeholder="Пароль" />

          <ButtonEnter />
        </div>
      </main>
    </>
  );
}
