import { ButtonNotFound } from "Components/UI/buttons";
import "./style.css";
import scan from "assets/images/icons/scan-qr.svg";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "Components/services/UserService";
import { Html5Qrcode } from "html5-qrcode";

export default function NotFound() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [eid, setEid] = useState(searchParams.get("eid"));
  const [isNotFound, setIsNotFound] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const Check = (search) => {
    const response = UserService.getQrCheck(search);
    response
      .then(() => {
        navigate(`/checking/product/?eid=${search}`);
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

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };
    const html5QrCode = new Html5Qrcode("qrCodeContainer");
    const qrScannerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => console.log("scanner stop"))
          .catch(() => {
            "scanner error";
          });
      }
    };
    const qrCodeSuccess = (decodedText) => {
      const urlParams = new URLSearchParams(
        decodedText.slice(decodedText.indexOf("?"))
      );
      setEid(urlParams.get("eid"));
      setSearchParams({ eid: urlParams.get("eid") });
      setIsEnabled(false);
    };

    if (isEnabled) {
      html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccess);
    } else {
      qrScannerStop();
    }

    return () => {
      qrScannerStop();
    };
  }, [isEnabled]);

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
        <div className="check-product__download-block">
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
                value={eid || ""}
                type="text"
                placeholder="Введите идентификатор товара"
                className="check-product__download-photo"
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
          </div>

          <button
            onClick={() => {
              setIsEnabled(!isEnabled);
            }}
            className="load-photo"
            htmlFor="load-photo"
          >
            <img src={scan} alt="" />
            Отсканировать
          </button>
          <div style={{ display: !isEnabled && "none" }} className="scanner">
            <div id="qrCodeContainer"></div>
          </div>
          {isEnabled && (
            <>
              <button
                onClick={() => setIsEnabled(!isEnabled)}
                className="start-scanner"
              >
                X
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}
