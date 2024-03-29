import { Header } from "Components/Layout/Header";
import "./style.css";
import { MainTop } from "Components/Layout/MainTop";
import { InputList } from "Components/Layout/InputList";

export default function CreateQr(params) {
  return (
    <>
      <Header isAuth={true} />
      <main className="main container">
        <MainTop text="Список продуктов" link="" />
        <InputList />
      </main>
    </>
  );
}
