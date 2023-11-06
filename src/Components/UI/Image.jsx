import { Catch } from "Components/utils/catch";

const { default: UserService } = require("Components/services/UserService");
const { default: readFile } = require("Components/utils/toImage");
const { useState, useEffect } = require("react");

const Image = ({ id }) => {
  const [qrCode, setQrCode] = useState();

  useEffect(() => {
    const response = UserService.getGeneratedQr(id);
    response
      .then((res) => res.data)
      .then((blob) => {
        const file = new File([blob], "image", { type: blob.type });
        readFile(file, setQrCode, qrCode);
        console.log(qrCode);
      })
      .catch((error) => {
        Catch(error);
      });
  }, []);

  return <img className="qr-code__qr" src={qrCode} alt="" />;
};

export { Image };
