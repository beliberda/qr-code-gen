import { ButtonCreateQr, ButtonDefault } from "Components/UI/buttons";
import "./style.css";

const MainTop = ({ link, text }) => {
  return (
    <>
      <section className="main-top">
        <ButtonCreateQr link={link} id={1} text={text} />
        <ButtonDefault text="Шаблоны описаний товаров" />
      </section>
    </>
  );
};
export { MainTop };
