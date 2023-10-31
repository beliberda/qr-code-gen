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
  const [id, setId] = useState("65046106121361691e6861de");

  const [qrData, setQrData] = useState({
    name: "" || null,
    description: "" || null,
    category: "" || null,
    color: "" || null,
    size: "" || null,
    materials: "" || null,
    photo: "" || null,
  });
  const [qrCode, setQrCode] = useState({});
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

  // create product

  const saveQrCode = () => {
    try {
      axios.post(`${API_URL}product`, qrData);
      console.log("Product Create");
    } catch (error) {
      console.log(error);
    }
    console.log(qrData);
  };
  // Получение qr кода
  function readFile(input) {
    const fr = new FileReader();
    fr.readAsDataURL(input);
    fr.addEventListener("load", () => {
      const res = fr.result;
      setQrCode(res);
    });
  }
  const generateQrCode = () => {
    try {
      axios
        .post(
          `${API_URL}qr/${id}`,
          {
            size: 500,
            foreground_color: {
              r: 0,
              g: 0,
              b: 0,
              a: 100,
            },
            background_color: {
              r: 0,
              g: 0,
              b: 0,
              a: 0,
            },
          },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          return res.data;
        })

        .then((blob) => {
          const file = new File([blob], "image", { type: blob.type });
          readFile(file);
          console.log(qrCode);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="input-list" id="parent">
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
            <button onClick={() => generateQrCode()}>
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
        {qrCode !== {} ? (
          <>
            <img className="preview" src={qrCode} alt="..." />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export { InputList };
