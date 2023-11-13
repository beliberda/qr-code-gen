import "./style.css";
import { Select } from "Components/UI/Select";
import gen from "assets/images/icons/generate.svg";
import { useContext, useEffect, useState } from "react";
import download from "assets/images/icons/download-create.svg";
import arrow from "assets/images/icons/arrow-sort.svg";
import UserService from "Components/services/UserService";
import readFile from "Components/utils/toImage";
import { Context } from "index";
import { useNavigate } from "react-router-dom";

const InputList = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [templateList, setTemplateList] = useState(
    JSON.parse(JSON.stringify(store.templates))
  );
  useEffect(() => {
    setTemplateList(JSON.parse(JSON.stringify(store.templates)));
  }, [store.templates, store]);
  const inputMass = [
    {
      label: "название товара",
      placeholder: "Выберите товар",
      name: "name",
      options: ["KNITTED SWEATSHIRT ROCK", "GR Full oversize mega pants"],
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
      label: "Ссылка на товар",
      placeholder: "Вставьте ссылку",
      name: "url",
      options: [""],
    },

    {
      label: "описание товара",
      placeholder: "Выберите описание",
      name: "template_id",
      options: templateList.map((obj) => obj.text),
    },
    {
      label: "добавление тэгов",
      placeholder: "Выберите основные тэги",
      name: "tags",
      options: ["#sweater", "#cool"],
    },
  ];

  const [id, setId] = useState("");

  const [qrData, setQrData] = useState({
    name: "" || null,
    description: "" || null,
    category: "" || null,
    url: "" || null,
    size: "" || null,
    materials: "" || null,
    photo: [""],
  });
  const [qrCode, setQrCode] = useState(null);
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

  // Получение qr кода
  const generateQrCode = (id) => {
    const response = UserService.getGeneratedQr(id);
    response
      .then((res) => res.data)
      .then((blob) => {
        const file = new File([blob], "image", { type: blob.type });
        readFile(file, setQrCode);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // create product

  const saveQrCode = () => {
    const response = UserService.fetchSaveProduct(qrData);
    response
      .then((res) => {
        console.log("create product", res);
        return res.data;
      })
      .then((id) => {
        const response = UserService.createQr(id);
        response
          .then((res) => {
            console.log(res);
            return res.data;
          })
          .then((id) => {
            generateQrCode(id);
            setId(id);
          });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="input-list" id="parent">
        {inputMass.map((elem, i) => {
          return (
            <Select
              id={i}
              options={elem.options}
              name={elem.name}
              label={elem.label}
              placeholder={elem.placeholder}
              handleClick={handleClick}
            />
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
            <button onClick={() => saveQrCode()}>
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
        <button onClick={() => navigate("/user/1")} className="create-save">
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
        {qrCode === null ? (
          <></>
        ) : (
          <>
            <img className="preview" src={qrCode} alt="..." />
          </>
        )}
      </div>
    </>
  );
};
export { InputList };
