import "./style.css";
import arrow from "assets/images/icons/arrow-sort.svg";
import { useContext, useEffect, useState } from "react";
import UserService from "Components/services/UserService";
import { Catch } from "Components/utils/catch";
import { dateFormat } from "Components/utils/dateFormat";
import { ButtonDefault } from "Components/UI/buttons";
import { Context } from "index";
const ModalTemplates = () => {
  const [products, setProducts] = useState([]);
  const { store } = useContext(Context);
  useEffect(() => {
    const response = UserService.getProducts();
    response
      .then((res) => {
        console.log("template", res);
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
              <h2>Название товара</h2>
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
              <h2>Описание</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>Категория</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>Ссылка на товар</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>Фото</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th">
            <div className="head-th__block">
              <h2>Создан</h2>
              <div className="filter-sort">
                <img src={arrow} alt="" />
              </div>
            </div>
          </th>
          <th className="table__head-th"></th>
        </tr>
      </thead>
      {products ? (
        <tbody>
          {products.map((product, i) => {
            let created_at = dateFormat(new Date(product.created_at));
            return (
              <>
                <tr key={i} className="table__full-info">
                  <td>
                    <div className="full-info__source">
                      <p>{product?.name} </p>
                    </div>
                  </td>
                  <td>
                    <div className="full-info__description">
                      <p>{product?.description}</p>
                    </div>
                  </td>
                  <td>
                    <div className="full-info__description">
                      <p>{product?.category}</p>
                    </div>
                  </td>
                  <td>
                    <div className="full-info__description">
                      <a href={product?.url}>Ссылка на товар</a>
                    </div>
                  </td>
                  <td>
                    <img
                      className="full-info__preview"
                      src={product.photo[0]}
                      alt=""
                    />
                  </td>
                  <td>
                    <div className="full-info__description">
                      <p>{created_at}</p>
                    </div>
                  </td>
                  <td>
                    <div className="full-info__description">
                      <ButtonDefault
                        font={16}
                        padding={"6px 8px"}
                        textTransform={"none"}
                        text="Применить шаблон"
                        handlClick={() => {
                          store.setProduct(product);
                        }}
                      />
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

export { ModalTemplates };
