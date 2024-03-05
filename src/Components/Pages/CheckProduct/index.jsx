import { Header } from "Components/Layout/Header";
import "./style.css";
import scan from "assets/images/icons/scan-qr.svg";
import { Banner } from "Components/UI/banner";
import QrScanner from "qr-scanner";
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
  // qr Scanner

  // scan Image
  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    await QrScanner.scanImage(file, {
      returnDetailedScanResult: false,
    })
      .then((result) => {
        console.log(result);
        let url = result?.data;
        const urlParams = new URLSearchParams(url.slice(url.indexOf("?")));
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
            <input
              id="load-photo"
              type="file"
              className="check-product__download-photo"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => {
                handleChange(e);
              }}
            />
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
                  Закрыть
                </button>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
