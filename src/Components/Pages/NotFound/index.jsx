import { ButtonNotFound } from "Components/UI/buttons";
import "./style.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import UserService from "Components/services/UserService";

export default function NotFound() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [eid, setEid] = useState(searchParams.get("eid"));
  const [isNotFound, setIsNotFound] = useState(false);

  const Check = (search) => {
    const response = UserService.getQrCheck(search);
    response
      .then(() => {
        navigate(`/checking/?eid=${search}`);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsNotFound(true);
          setTimeout(() => {
            setIsNotFound(false);
          }, 5000);
        }
        if (error.response.status === 403) {
          navigate(`/notfound`);
        }
      });
  };

  return (
    <>
      <main className="page__not-found container">
        <div className="not-found__top">
          <h1>Проверка подлинности товара</h1>
          <ButtonNotFound />
        </div>
        <div className="not-found__bottom">
          <Link to="/">
            <p>
              Проверка подлинности товара не подтверждена, попробуйте еще раз
              или обратитесь к менеджеру...
            </p>
          </Link>
        </div>
        <div className="check-product__input-block">
          <div
            className={
              !isNotFound
                ? "check-product__input"
                : "check-product__input --error"
            }
          >
            <h2 className="input-block__title">идентификационный номер</h2>
            <input
              onChange={(e) => {
                setEid(e.value);
                setSearchParams({ eid: e.target.value });
              }}
              value={eid}
              type="text"
              placeholder="Введите идентификатор товара"
            />
            {isNotFound && (
              <p className="input-block__error-text">
                ID не найден, попробуйте ввести еще раз
              </p>
            )}
          </div>
          <button
            onClick={() => {
              if (searchParams.get("eid") !== null) {
                Check(searchParams.get("eid"));
              }
            }}
            className="button-enter"
          >
            Проверить
          </button>
          {/* <ButtonDefault text="Проверить" /> */}
        </div>
      </main>
    </>
  );
}
