import { Header } from "Components/Layout/Header";
import "./style.css";
import { ButtonDefault } from "Components/UI/buttons";
import scan from "assets/images/icons/scan-qr.svg";
import { Banner } from "Components/UI/banner";
import { useContext, useEffect } from "react";
import { Context } from "index";

import { useNavigate, useSearchParams } from "react-router-dom";
export default function CheckProduct() {
  // const [id, setId] = useState("65046106121361691e6861de");
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const Check = () => {
    navigate(`/checking/?eid=${searchParams.get("eid")}`);
  };

  return (
    <>
      <Header />
      <Banner title="Проверка" titleSpan="подлинности" title2="товара" />
      <main className="check-product container">
        <section className="check-product__content">
          <div className="check-product__input-block">
            <div className="check-product__input">
              <h2 className="input-block__title">идентификационный номер</h2>
              <input
                onChange={(e) => setSearchParams({ eid: e.target.value })}
                type="text"
                value={searchParams.get("eid") ? searchParams.get("eid") : ""}
                placeholder="Введите идентификатор товара"
              />
            </div>
            <button
              onClick={() => {
                if (searchParams.get("eid") !== undefined) {
                  Check();
                }
              }}
              className="button-enter"
            >
              Проверить
            </button>
            {/* <ButtonDefault text="Проверить" /> */}
          </div>
          <div className="check-product__download-block">
            <input
              id="load-photo"
              type="file"
              className="check-product__download-photo"
            />
            <label className="load-photo" htmlFor="load-photo">
              <img src={scan} alt="" />
              Загрузить или сделать фотографию
            </label>
          </div>
        </section>
      </main>
    </>
  );
}
