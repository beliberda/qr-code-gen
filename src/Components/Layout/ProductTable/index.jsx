import "./style.css";
import arrow from "assets/images/icons/arrow-sort.svg";
import React, { useEffect, useState } from "react";
import UserService from "Components/services/UserService";
import { Catch } from "Components/utils/catch";
import { Accordion } from "Components/UI/accordion";
import { ButtonDefault } from "Components/UI/buttons";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchEid, setSearchEid] = useState("");
  const [searchProduct, setSearchProduct] = useState(null);

  useEffect(() => {
    const getQr = UserService.getQr(page);
    getQr
      .then((res) => {
        console.log("qr:", res, page);
        setTotalPages(res.data.total);
        setProducts(res.data.items);
        // setProducts(res.data);
      })
      .catch((error) => {
        Catch(error);
      });
  }, [page]);

  const SearchQr = (eid) => {
    if (searchEid.length != 0) {
      UserService.getQrById(eid)
        .then((res) => {
          console.log(res);
          setSearchProduct(res.data);
        })
        .catch((error) => {
          setSearchEid("Eid не найден");
          setTimeout(() => {
            setSearchEid("Введите eid продукта");
          }, 3000);
          Catch(error);
        });
    }
  };

  return (
    <>
      <div className="table__search-product">
        <input
          value={searchEid}
          onInput={(e) => {
            setSearchEid(e.target.value);
          }}
          type="text"
          placeholder="Введите eid продукта"
        />
        <ButtonDefault
          handlClick={() => {
            SearchQr(searchEid);
          }}
          text="Найти"
          font={14}
          padding={10}
        />
      </div>

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
            {searchProduct && (
              <Accordion isSearch={true} product={searchProduct} />
            )}
            {products.map((product, i) => {
              return (
                <React.Fragment key={i}>
                  <Accordion product={product} />
                </React.Fragment>
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
            if (page < totalPages) {
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
