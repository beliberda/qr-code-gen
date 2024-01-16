import "./style.css";
import arrow from "assets/images/icons/arrow-sort.svg";
import { useEffect, useState } from "react";
import UserService from "Components/services/UserService";
import { Catch } from "Components/utils/catch";
import { Accordion } from "Components/UI/accordion";
import { ButtonDefault } from "Components/UI/buttons";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getQr = UserService.getQr(page);
    getQr
      .then((res) => {
        console.log("qr:", res, page);
        setProducts(res.data);
      })
      .catch((error) => {
        Catch(error);
      });
  }, [page]);

  return (
    <>
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
                <h2>EID продукта</h2>
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
      <div className="pagination">
        <ButtonDefault
          handlClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
          text={"<"}
        />
        <button className="pagination__current-page">{page}</button>
        <ButtonDefault
          handlClick={() => {
            if (page < 100) {
              setPage(page + 1);
            }
          }}
          text={">"}
        />
      </div>
    </>
  );
};

export { ProductTable };
