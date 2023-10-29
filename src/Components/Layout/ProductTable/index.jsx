import "./style.css";
import arrow from "assets/images/icons/arrow-sort.svg";
import check from "assets/images/icons/icon-check.svg";
import accordeon from "assets/images/icons/accordeon-arrow.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "Components/http";

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
        <tr className="table-info">
          <td>
            <h3 className="table-date">10.02.2023 12:32</h3>
          </td>
          <td>
            <h3 className="table-name">Total graphite suit</h3>
          </td>
          <td>
            <h3 className="table-id">609613081</h3>
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
            <h3 className="table-first-check">10.02.2023 12:32</h3>
          </td>
          <td>
            <h3 className="table-last-check">12.02.2023 15:32</h3>
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
      </tbody>
    </table>
  );
};

export { ProductTable };
