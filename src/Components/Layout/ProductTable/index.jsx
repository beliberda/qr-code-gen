import "./style.css";
import download from "assets/images/icons/download-create.svg";
import arrow from "assets/images/icons/arrow-sort.svg";
import check from "assets/images/icons/icon-check.svg";
import qr from "assets/images/qrcodeexsample.svg";
import image from "assets/images/photo1.png";
import accordeon from "assets/images/icons/accordeon-arrow.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "Components/http";
import { ButtonDisableQr } from "Components/UI/buttons";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${API_URL}product`)
        .then((response) => setProducts(response.data));
      console.log("prod:", products);
    } catch (error) {
      console.log(error);
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
      <tbody>
        {products.map((product) => {
          let create = new Date(product.created_at);
          let update = new Date(product.updated_at);
          let created_at =
            create.getDate() +
            "." +
            (create.getMonth() + 1) +
            "." +
            create.getFullYear() +
            " " +
            create.getHours() +
            ":" +
            create.getMinutes();
          let updated_at =
            update.getDate() +
            "." +
            (update.getMonth() + 1) +
            "." +
            update.getFullYear() +
            " " +
            update.getHours() +
            ":" +
            update.getMinutes();

          return (
            <>
              <tr className="table-info">
                <td>
                  <h3 className="table-date">{created_at}</h3>
                </td>
                <td>
                  <h3 className="table-name">{product.name}</h3>
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
              <tr className="table__full-info">
                <td>
                  <div className="full-info__source">
                    <h4>Источник QR-кода</h4>
                    <p>Сгенерирован в ручную </p>
                  </div>
                </td>
                <td colspan="2">
                  <div className="full-info__description">
                    <h4>Описание</h4>
                    <p>{product.description}</p>
                  </div>
                </td>
                <td>
                  <img
                    className="full-info__preview"
                    src={product.photo}
                    alt=""
                  />
                </td>
                <td colspan="3">
                  <div className="full-info__qr-code">
                    <img className="qr-code__qr" src={qr} alt="" />
                    <div className="qr-code__qr-options">
                      <h3>Выберите формат файла</h3>
                      <div className="qr-options__buttons">
                        <button htmlFor="create-photo" className="btn-download">
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
    </table>
  );
};

export { ProductTable };