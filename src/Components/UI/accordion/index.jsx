import { useState } from "react";
import "./style.css";
import { dateFormat } from "Components/utils/dateFormat";
import { Image } from "../Image";
import download from "assets/images/icons/download-create.svg";
import arrow from "assets/images/icons/arrow-sort.svg";
import check from "assets/images/icons/icon-check.svg";
import accordeon from "assets/images/icons/accordeon-arrow.svg";
import { ButtonDisableQr } from "../buttons";
import UserService from "Components/services/UserService";
import { Catch } from "Components/utils/catch";
import { useContext } from "react";
import { Context } from "index";

const Accordion = ({ product, i }) => {
  let created_at = dateFormat(new Date(product.created_at));
  let updated_at = dateFormat(new Date(product.updated_at));
  const { store } = useContext(Context);
  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState("");

  const diableQr = (id) => {
    const response = UserService.disabledQr(id);
  };
  const getDescription = (id) => {
    const response = UserService.getTemplate(id);
    response
      .then((res) => {
        setDescription(res.data.text);
      })
      .catch((error) => {
        Catch(error);
      });
  };
  return (
    <>
      <tr key={i} className="table-info">
        <td>
          <h3 className="table-date">{created_at}</h3>
        </td>
        <td>
          <h3 className="table-name">{product.product.name}</h3>
        </td>
        <td>
          <h3 className="table-id">{product._id}</h3>
        </td>
        <td>
          <h3 className="table-status">
            <button className="button-enter table__btn-status">
              <img src={check} alt="" />
              Да
            </button>
          </h3>
        </td>
        <td>
          <h3 className="table-first-check">{created_at}</h3>
        </td>
        <td>
          <h3 className="table-last-check">{updated_at}</h3>
        </td>
        <td>
          <div className="table-accordeon">
            <h3 className="table-count">2</h3>
            <button
              onClick={() => {
                setIsActive(!isActive);
                console.log(isActive);
              }}
              className="accordeon-btn"
            >
              <img
                style={{
                  transform: `${isActive ? "rotate(180deg)" : "rotate(0)"} `,
                }}
                src={accordeon}
                alt=""
              />
            </button>
          </div>
        </td>
      </tr>
      {isActive && (
        <tr key={product._id} className="table__full-info">
          <td>
            <div className="full-info__source">
              <h4>Источник QR-кода</h4>
              <p>Сгенерирован в ручную </p>
            </div>
          </td>
          <td colSpan="2">
            <div className="full-info__description">
              <h4>Описание</h4>
              <p>
                {getDescription(product.product.template_id)}
                {description}
              </p>
            </div>
          </td>
          <td>
            <img
              className="full-info__preview"
              src={product.product.photo}
              alt=""
            />
          </td>
          <td colSpan="3">
            <div className="full-info__qr-code">
              <Image id={product._id} />
              <div className="qr-code__qr-options">
                <h3> Выберите формат файла</h3>
                <div className="qr-options__buttons">
                  <button htmlFor="create-photo" className="btn-download">
                    <img src={download} alt="" />
                    <a download href={store.qrSrc}>
                      Загрузить
                    </a>
                    <img src={arrow} alt="" />
                  </button>
                  <ButtonDisableQr
                    handlClick={() => {
                      diableQr(product._id);
                    }}
                    text="Отключить QR-код"
                  />
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
export { Accordion };
