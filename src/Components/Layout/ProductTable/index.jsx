import "./style.css";
import download from "assets/images/icons/download-create.svg";
import arrow from "assets/images/icons/arrow-sort.svg";
import check from "assets/images/icons/icon-check.svg";
import accordeon from "assets/images/icons/accordeon-arrow.svg";
import { useEffect, useState } from "react";

import { ButtonDisableQr } from "Components/UI/buttons";
import UserService from "Components/services/UserService";

function dateFormat(date) {
  return (
    date.getDate() +
    "." +
    (date.getMonth() + 1) +
    "." +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
}

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [qrCode, setQrCode] = useState([]);

  useEffect(() => {
    try {
      const response = UserService.getQr();
      response.then((res) => {
        setProducts(res.data);
        console.log("qr:", products);
      });
    } catch (error) {
      console.log("error");
    }
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>Дата создания</h2>
              <div
                className="filter-sort"
                style={{ backgroundColor: "var(--grey-light)" }}
              >
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>Название товара</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>ID продукта</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>Статус</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>Первая проверка</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>Последняя проверка</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>Количество</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      {products ? (
        <tbody>
          {products.map((product, i) => {
            let created_at = dateFormat(new Date(product.created_at));
            let updated_at = dateFormat(new Date(product.updated_at));

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
                      <button className="accordeon-btn">
                        <img src={accordeon} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
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
                      <p>{product.product.description}</p>
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
                      <img
                        className="qr-code__qr"
                        src={`data:image/png;base64,${qrCode}`}
                        alt=""
                      />
                      <div className="qr-code__qr-options">
                        <h3>Выберите формат файла</h3>
                        <div className="qr-options__buttons">
                          <button
                            htmlFor="create-photo"
                            className="btn-download"
                          >
                            <img src={download} alt="" />
                            Загрузить
                            <img src={arrow} alt="" />
                          </button>
                          <ButtonDisableQr text="Отключить QR-код" />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      ) : (
        <></>
      )}
    </table>
  );
};

export { ProductTable };
