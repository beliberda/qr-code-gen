import { Header } from "Components/Layout/Header";
import "./style.css";
import { ProductTable } from "Components/Layout/ProductTable";
import { MainTop } from "Components/Layout/MainTop";

export default function ListProducts() {
  return (
    <>
      <Header isAdmin={true} />
      <main className="main container">
        <MainTop text="Создать qr-код" link="create-qr" />
        <ProductTable />
      </main>
    </>
  );
}
