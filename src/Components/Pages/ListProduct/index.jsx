import { Header } from "Components/Layout/Header";
import "./style.css";
import { ProductTable } from "Components/Layout/ProductTable";
import { MainTop } from "Components/Layout/MainTop";
import { useContext } from "react";
import { Context } from "index";

export default function ListProducts(params) {
  const { store } = useContext(Context);
  return (
    <>
      <Header isAdmin={true} />
      <main className="main container">
        <MainTop />
        <ProductTable />
      </main>
    </>
  );
}
