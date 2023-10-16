import { ButtonCreateQr, ButtonDefault } from "Components/UI/buttons";
import "./style.css";

const MainTop = () => {
  return (
    <>
      <section className="main-top">
        <ButtonCreateQr text="Создать QR-код" />
        <ButtonDefault text="Шаблоны описаний товаров" />
      </section>
    </>
  );
};
export { MainTop };
