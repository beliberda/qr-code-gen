import { Header } from "Components/Layout/Header";
import "./style.css";
import scan from "assets/images/icons/scan-qr.svg";
import { Banner } from "Components/UI/banner";
import QrScanner from "qr-scanner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "Components/services/UserService";
export default function CheckProduct() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [eid, setEid] = useState(searchParams.get("eid"));

  const [isNotFound, setIsNotFound] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    await QrScanner.scanImage(file)
      .then((result) => {
        const urlParams = new URLSearchParams(
          result.slice(result.indexOf("?"))
        );
        setEid(urlParams.get("eid"));
        setSearchParams({ eid: urlParams.get("eid") });
      })
      .catch((error) => {
        setIsNotFound(true);
        setTimeout(() => {
          setIsNotFound(false);
        }, 5000);
        console.log(error || "No QR code found.");
      });
  };

  const Check = (search) => {
    const response = UserService.getQrCheck(search);
    response
      .then(() => {
        navigate(`/checking/product/?eid=${search}`);
      })
      .catch((error) => {
        if (error?.response?.status === 404) {
          setIsNotFound(true);
          setTimeout(() => {
            setIsNotFound(false);
          }, 5000);
        }
        if (error?.response?.status === 403) {
          navigate(`/notfound`);
        }
      });
  };
  useEffect(() => {
    if (searchParams.get("eid") !== null) {
      Check(searchParams.get("eid"));
    }
  }, []);

  return (
    <>
      {document.referrer === "https://manekenbrand.com/" ? <> </> : <Header />}

      <Banner title="Проверка" titleSpan="подлинности" title2="товара" />
      <main className="check-product container">
        <section className="check-product__content">
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
                  setEid(e.target.value);
                  setSearchParams({ eid: e.target.value });
                }}
                value={eid || ""}
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
          <div className="check-product__download-block">
            <input
              id="load-photo"
              type="file"
              className="check-product__download-photo"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => {
                handleChange(e);
              }}
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
