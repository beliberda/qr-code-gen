import "./style.css";
import { useContext, useEffect, useState } from "react";
import UserService from "Components/services/UserService";
import { Catch } from "Components/utils/catch";
import { ButtonDefault } from "Components/UI/buttons";
import { Context } from "index";
import { observer } from "mobx-react-lite";
const inputMass = [
  "название товара",
  "категория товара",
  "размера товара",
  "ссылка на товар",
];
const ModalTemplatesDescription = () => {
  const { store } = useContext(Context);

  const [templates, setTemplates] = useState([]);
  const [editTemplate, setEditTemplate] = useState({});

  const [isEdit, setIsEdit] = useState(null);
  const [isCreate, setIsCreate] = useState(null);

  useEffect(() => {
    const response = UserService.getTemplates();
    response
      .then((res) => {
        store.setTemplates(res.data);
        setTemplates(res.data);
      })
      .catch((error) => {
        Catch(error);
      });
  }, [isCreate, isEdit, store]);

  const editDescription = (id, text) => {
    const response = UserService.editTemplate(id, text);
    response.then(() => {
      setIsEdit(true);
    });
  };

  const createDescription = (text) => {
    const response = UserService.createTemplate(text);
    response.then(() => {
      setIsEdit(false);
      setIsCreate(false);
    });
  };
  const deleteTemplate = (id, i) => {
    let newTemplate = templates.filter((item, j) => j !== i);
    setTemplates(newTemplate);
    const response = UserService.deleteTemplate(id);
  };
  return (
    <>
      <section className="template-modal">
        {isEdit ? (
          <>
            <div className="template-list">
              <h2 className="template-title">Описание</h2>
              <h4>
                {inputMass.map((e) => {
                  return "{" + e + "}";
                })}
              </h4>
              <article className="template-item">
                <textarea
                  className="template-description"
                  value={editTemplate.text}
                  onChange={(e) => {
                    setEditTemplate({ ...editTemplate, text: e.target.value });
                  }}
                />
                <ButtonDefault
                  text={isCreate ? "Сохранить" : "Редактировать"}
                  font={14}
                  textTransform="capitalize"
                  padding="6px 8px"
                  handlClick={
                    isCreate
                      ? () => {
                          createDescription(editTemplate.text);
                        }
                      : () => {
                          editDescription(editTemplate._id, editTemplate.text);
                          setIsEdit(false);
                        }
                  }
                />
              </article>
            </div>
            <ButtonDefault
              text="К шаблонам"
              font={16}
              textTransform="uppercase"
              handlClick={() => {
                setIsEdit(false);
                setIsCreate(false);
              }}
            />
          </>
        ) : (
          <>
            <div className="template-list">
              <h2 className="template-title">Описание</h2>
              {templates.map((item, i) => {
                return (
                  <article key={i} className="template-item">
                    <p className="template-description">{item.text}</p>
                    <div className="template-buttons">
                      <ButtonDefault
                        text="Редактировать"
                        font={14}
                        textTransform="capitalize"
                        padding="6px 8px"
                        handlClick={() => {
                          setEditTemplate(item);
                          setIsEdit(true);
                          setIsCreate(false);
                        }}
                      />
                      <ButtonDefault
                        text="Удалить"
                        font={12}
                        textTransform="lower"
                        padding="4px 6px"
                        handlClick={() => {
                          deleteTemplate(item._id, i);
                        }}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
            <ButtonDefault
              text="Создать Шаблон"
              font={16}
              textTransform="uppercase"
              handlClick={() => {
                setIsEdit(true);
                setIsCreate(true);
              }}
            />
          </>
        )}
      </section>
    </>
  );
};

export default observer(ModalTemplatesDescription);
