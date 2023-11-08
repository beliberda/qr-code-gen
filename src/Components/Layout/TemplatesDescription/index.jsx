import "./style.css";
import arrow from "assets/images/icons/arrow-sort.svg";
import { useContext, useEffect, useState } from "react";
import UserService from "Components/services/UserService";
import { Catch } from "Components/utils/catch";
import { dateFormat } from "Components/utils/dateFormat";
import { ButtonDefault } from "Components/UI/buttons";
import { Context } from "index";

const descriptions = [
  {
    id: 1,
    template:
      "{Тип товара} {Название товара} разработаны с любовью командой Maneken Brand. Спасибо, что выбрали нас! Вы можете быть уверены, что {Название товара} создано профессионалами из лучших материалов: {Материалы товара}",
  },
];
const ModalTemplatesDescription = () => {
  const [products, setProducts] = useState([]);
  const { store } = useContext(Context);
  useEffect(() => {
    const response = UserService.getProducts();
    response
      .then((res) => {
        console.log("template", res);
        setProducts(res.data);
      })
      .catch((error) => {
        Catch(error);
      });
  }, []);

  return (
    <>
      <section className="template-modal">
        <div className="template-list">
          <h2 className="template-title">Описание</h2>
          {descriptions.map((item) => {
            return (
              <article className="template-item">
                <p className="template-description">{item.template}</p>
                <ButtonDefault
                  text="Редактировать"
                  font={14}
                  textTransform="capitalize"
                  padding="6px 8px"
                />
              </article>
            );
          })}
        </div>
        <ButtonDefault text="Сохранить" font={16} textTransform="uppercase" />
      </section>
    </>
  );
};

export { ModalTemplatesDescription };
