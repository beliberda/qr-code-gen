import "./style.css";
import arrow from "assets/images/icons/arrow-sort.svg";

const ProductTable = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table__head-th">
            <h2>Дата создания</h2>
            <div
              className="filter-sort"
              style={{ backgroundColor: "var(--grey-light)" }}
            >
              <img src={arrow} alt="" />
            </div>
          </th>
          <th className="table__head-th">
            <h2>Название товара</h2>
            <div className="filter-sort">
              <img src={arrow} alt="" />
            </div>
          </th>
          <th className="table__head-th">
            <h2>ID продукта</h2>
            <div className="filter-sort">
              <img src={arrow} alt="" />
            </div>
          </th>
          <th className="table__head-th">
            <h2>Статус</h2>
            <div className="filter-sort">
              <img src={arrow} alt="" />
            </div>
          </th>
          <th className="table__head-th">
            <h2>Первая проверка</h2>
            <div className="filter-sort">
              <img src={arrow} alt="" />
            </div>
          </th>
          <th className="table__head-th">
            <h2>Последняя проверка</h2>
            <div className="filter-sort">
              <img src={arrow} alt="" />
            </div>
          </th>
          <th className="table__head-th">
            <h2>Количество</h2>
            <div className="filter-sort">
              <img src={arrow} alt="" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export { ProductTable };
