import "./style.css";
import download from "assets/images/icons/download-create.svg";
import arrow from "assets/images/icons/arrow-sort.svg";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "Components/http";
const CreateBottom = (props) => {
  const [qrData, setQrData] = useState({});
  const [image, setImage] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const saveQrCode = async () => {
    try {
      axios.post(API_URL, qrData);
      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="create-bottom">
        <div className="create__download">
          <h2 className="create__download-photo">Фотографии товара</h2>
          <input onChange={onImageChange} type="file" id="create-photo" />
          <label htmlFor="create-photo" className="btn-download">
            <img src={download} alt="" />
            Загрузить
            <img src={arrow} alt="" />
          </label>
        </div>
        <button onClick={() => saveQrCode()} className="create-save">
          Сохранить
        </button>
      </div>
      <img className="create-preview" src={image} alt="" />
    </>
  );
};

export { CreateBottom };
