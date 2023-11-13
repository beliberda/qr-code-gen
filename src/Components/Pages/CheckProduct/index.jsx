import { Header } from "Components/Layout/Header";
import "./style.css";
import { ButtonDefault } from "Components/UI/buttons";
import scan from "assets/images/icons/scan-qr.svg";
import { Banner } from "Components/UI/banner";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
export default function CheckProduct() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const Check = (search) => {
    navigate(`/checking/?${search}`);
  };
  useEffect(() => {
    // window.addEventListener("message", (event) => {
    //   if (event.origin === "https://manekenbrand.com/checking/") {
    //     console.log(event.data);
    //     console.log(event.data.slice(event.data.indexOf("=") + 1));
    //   } else {
    //     console.log("else");
    //     return;
    //   }
    // });
    if (searchParams.get("eid") !== null) {
      Check(searchParams.get("eid"));
    }
  }, []);
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
                if (searchParams.get("eid") !== null) {
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
