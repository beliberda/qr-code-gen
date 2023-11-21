import { Catch } from "Components/utils/catch";
import { Context } from "index";
import { useContext } from "react";
import { ButtonDisableQr } from "./buttons";
import download from "assets/images/icons/download-create.svg";
import arrow from "assets/images/icons/arrow-sort.svg";
import del from "assets/images/icons/delete.svg";

const { default: UserService } = require("Components/services/UserService");
const { default: readFile } = require("Components/utils/toImage");
const { useState, useEffect } = require("react");

function newTabImage(src) {
  let image = new Image();
  image.src = src;
  let w = window.open("", "_blank");
  w.document.write(image.outerHTML);
  // w.document.close();
}
const diableQr = (id) => {
  const response = UserService.disabledQr(id);
};
const deleteQr = (id) => {
  const response = UserService.deleteQr(id);
};
const ImageQr = ({ id }) => {
  const [qrCode, setQrCode] = useState();
  const { store } = useContext(Context);
  console.log("qrId", id);
  useEffect(() => {
    const response = UserService.getGeneratedQr(id);
    response
      .then((res) => res.data)
      .then((blob) => {
        const file = new File([blob], "image", { type: blob.type });
        readFile(file, setQrCode, qrCode);
        store.setQrSrc(qrCode);
        console.log("qrcode src", qrCode);
      })
      .catch((error) => {
        Catch(error);
      });
  }, []);

  return (
    <>
      <img
        className="qr-code__qr"
        src={qrCode}
        alt=""
        onClick={() => {
          newTabImage(qrCode);
        }}
      />
      <div className="qr-code__qr-options">
        <h3> Выберите формат файла</h3>
        <div className="qr-options__buttons">
          <button htmlFor="create-photo" className="btn-download">
            <img src={download} alt="" />
            <a download href={qrCode}>
              Загрузить
            </a>
            <img src={arrow} alt="" />
          </button>
          <ButtonDisableQr
            handlClick={() => {
              diableQr(id);
            }}
            text="Отключить QR-код"
          />
          <img
            onClick={() => {
              deleteQr(id);
            }}
            src={del}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export { ImageQr };
