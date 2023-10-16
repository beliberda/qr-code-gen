import { Header } from "Components/Layout/Header";
import "./style.css";
import { MainTop } from "Components/Layout/MainTop";

export default function CreateQr(params) {
  return (
    <>
      <Header isAuth={true} />
      <main className="main container">
        <MainTop />
      </main>
    </>
  );
}
