import { Header } from "Components/Layout/Header";
import "./style.css";
import scan from "assets/images/icons/scan-qr.svg";
import { Banner } from "Components/UI/banner";
// import QrScanner from "qr-scanner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "Components/services/UserService";
import { Html5Qrcode } from "html5-qrcode";
export default function CheckProduct() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [eid, setEid] = useState(searchParams.get("eid"));

  const [isNotFound, setIsNotFound] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const Check = (search) => {
    const response = UserService.getQrCheck(search)
      .then(() => {
        console.log("navigate");
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
    if (eid) {
      Check(eid);
    }
  }, [eid]);
  // qr Scanner
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
            </div>
            {isNotFound && (
              <p className="error-text">
                qr code не обнаружен, попробуйте еще раз
              </p>
            )}
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
          <div className="check-product__download-block">
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
        </section>
      </main>
    </>
  );
}
