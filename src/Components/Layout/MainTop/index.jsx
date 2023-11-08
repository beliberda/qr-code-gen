import { ButtonCreateQr, ButtonDefault } from "Components/UI/buttons";
import "./style.css";
import { useContext, useState } from "react";
import { Context } from "index";
import { ModalTemplates } from "../Templates";
import { ModalTemplatesDescription } from "../TemplatesDescription";

const MainTop = ({ link, text }) => {
  const { store } = useContext(Context);
  const [isModal, setIsModal] = useState(store.isModal);
  return (
    <>
      <section className="main-top">
        <ButtonCreateQr link={link} id={1} text={text} />
        <ButtonDefault
          handlClick={() => {
            store.setModal();
            setIsModal(store.isModal);
          }}
          text="Шаблоны описаний товаров"
        />
      </section>
      {isModal ? <ModalTemplatesDescription /> : <></>}
    </>
  );
};
export { MainTop };
