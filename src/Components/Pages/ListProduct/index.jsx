import { Header } from "Components/Layout/Header";
import "./style.css";
import { ProductTable } from "Components/Layout/ProductTable";
import { MainTop } from "Components/Layout/MainTop";

export default function ListProducts(params) {
  return (
    <>
      <Header isAuth={true} />
      <main className="main container">
        <MainTop />
        <ProductTable />
      </main>
    </>
  );
}
