import { Header } from "Components/Layout/Header";
import "./style.css";
import { MainTop } from "Components/Layout/MainTop";
import { InputList } from "Components/Layout/InputList";
import { CreateBottom } from "Components/Layout/CreateBottom";

export default function CreateQr(params) {
  return (
    <>
      <Header isAuth={true} />
      <main className="main container">
        <MainTop />
        <InputList />
        <CreateBottom />
      </main>
    </>
  );
}
