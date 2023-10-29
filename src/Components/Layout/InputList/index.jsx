import "./style.css";
import { Select } from "Components/UI/Select";
import gen from "assets/images/icons/generate.svg";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "Components/http";
import download from "assets/images/icons/download-create.svg";
import arrow from "assets/images/icons/arrow-sort.svg";

const inputMass = [
  {
    label: "название товара",
    placeholder: "Выберите товар",
    name: "name",
    options: ["Jeans", "Sweater"],
  },
  {
    label: "категория товара",
    placeholder: "Выберите категорию",
    name: "category",
    options: ["Jeans", "Sweater"],
  },
  {
    label: "размера товара",
    placeholder: "Выберите размер",
    name: "size",
    options: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    label: "цвет",
    placeholder: "Выберите цветовую палитру",
    name: "color",
    options: ["black", "white"],
  },
  {
    label: "материал",
    placeholder: "Выберите материалы",
    name: "material",
    options: ["50% cotton 50% acrylic"],
  },
  {
    label: "описание товара",
    placeholder: "Выберите описание",
    name: "description",
    options: ["Very cool sweater!"],
  },
  {
    label: "добавление тэгов",
    placeholder: "Выберите основные тэги",
    name: "tags",
    options: ["#sweater", "#cool"],
  },
];

const InputList = () => {
  const [id, setId] = useState("");

  function GenerateId() {
    setId(Math.floor(Math.random() * (999999999 - 100000000) + 100000000));
  }
  const [qrData, setQrData] = useState({
    name: null,
    description: null,
    category: null,
    color: null,
    size: null,
    materials: null,
    photo: null,
  });

  const a = qrData;
  const handleClick = (e) => {
    const value = e.target.value;

    setQrData({
      ...qrData,
      [e.target.name]: value,
    });
  };

  const [fileSelected, setFileSelected] = useState([]);
  const uploadMultiFiles = (e) => {
    const files = Array.from(e.target.files);
    setFileSelected(files);
    setQrData({ ...qrData, photo: files });
  };

  // create Qr Code

  const saveQrCode = () => {
    try {
      axios.post(`${API_URL}product`, qrData);
      console.log("Product Create");
    } catch (error) {
      console.log(error);
    }
    console.log(qrData);
  };

  return (
    <>
      <section className="input-list">
        {inputMass.map((elem, i) => {
          return (
            <div key={i}>
              <Select
                options={elem.options}
                name={elem.name}
                label={elem.label}
                placeholder={elem.placeholder}
                handleClick={handleClick}
              />
            </div>
          );
        })}
        <div className="input-block input-generate">
          <h2 className="input-block__title">идентификатор товара</h2>
          <div className="input-block__bottom input-id">
            <input
              onChange={(e) => setId(e.target.value)}
              value={id}
              type="text"
              placeholder="Введите идентификатор"
            />
            <button onClick={() => console.log(qrData)}>
              <img src={gen} alt="" />
              Сгенерировать
            </button>
          </div>
        </div>
      </section>
      <div className="create-bottom">
        <div className="create__download">
          <h2 className="create__download-photo">Фотографии товара</h2>
          <input
            onChange={uploadMultiFiles}
            type="file"
            id="create-photo"
            multiple
          />
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
      <div className="create-preview-list">
        {fileSelected.map((file, index) => (
          <img
            key={index}
            className="preview"
            src={URL.createObjectURL(file)}
            alt="..."
          />
        ))}
      </div>
    </>
  );
};
export { InputList };
