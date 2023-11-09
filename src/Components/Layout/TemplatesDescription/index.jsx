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
  const [templates, setTemplates] = useState([]);
  const [editTemplate, setEditTemplate] = useState({});
  const [isEdit, setIsEdit] = useState(true);

  const { store } = useContext(Context);

  useEffect(() => {
    const response = UserService.getTemplates();
    response
      .then((res) => {
        console.log("templates", res);
        setTemplates(res.data);
      })
      .catch((error) => {
        Catch(error);
      });
  }, []);

  const saveDescription = (id) => {
    const response = UserService.saveTemplate(id);
  };

  return (
    <>
      <section className="template-modal">
        {isEdit ? (
          <>
            <div className="template-list">
              <h2 className="template-title">Описание</h2>
              {templates.map((item) => {
                return (
                  <article className="template-item">
                    <p className="template-description">{item.text}</p>
                    <ButtonDefault
                      text="Редактировать"
                      font={14}
                      textTransform="capitalize"
                      padding="6px 8px"
                      handlClick={() => {
                        setEditTemplate(item);
                        setIsEdit(false);
                      }}
                    />
                  </article>
                );
              })}
            </div>
            <ButtonDefault
              text="Создать Шаблон"
              font={16}
              textTransform="uppercase"
            />
          </>
        ) : (
          <>
            <div className="template-list">
              <h2 className="template-title">Описание</h2>
              <h3>{"{Тип товара} {Название товара}"}</h3>
              <article className="template-item">
                <textarea className="template-description" />
                <ButtonDefault
                  text="Редактировать"
                  font={14}
                  textTransform="capitalize"
                  padding="6px 8px"
                />
              </article>
            </div>
            <ButtonDefault
              text="К шаблонам"
              font={16}
              textTransform="uppercase"
              handlClick={() => {
                setIsEdit(true);
              }}
            />
          </>
        )}
      </section>
    </>
  );
};

export { ModalTemplatesDescription };
