import "./style.css";
import arrow from "assets/images/icons/arrow-sort.svg";
import { useEffect, useState } from "react";
import UserService from "Components/services/UserService";
import { Catch } from "Components/utils/catch";
import { Accordion } from "Components/UI/accordion";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const response = UserService.getQr();
    response
      .then((res) => {
        console.log("qr:", res);
        setProducts(res.data);
      })
      .catch((error) => {
        Catch(error);
      });
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
            return (
              <>
                <Accordion product={product} />
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
