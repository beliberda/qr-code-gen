import "./style.css";
import { Select } from "Components/UI/Select";
import gen from "assets/images/icons/generate.svg";
import { useContext, useEffect, useState } from "react";
import UserService from "Components/services/UserService";
import readFile from "Components/utils/toImage";
import { Context } from "index";
import { useNavigate } from "react-router-dom";
import imageUploaded from "Components/utils/toBase64";
import { Catch } from "Components/utils/catch";

const InputList = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [templateList, setTemplateList] = useState(
    JSON.parse(JSON.stringify(store.templates))
  );

  useEffect(() => {
    setInterval(() => {
      setTemplateList(JSON.parse(JSON.stringify(store.templates)));
    }, 5000);
  }, []);
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

  // photo links
  const [inputLinkList, setInputLinkList] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const [id, setId] = useState("");
  //data for fetch
  const [qrData, setQrData] = useState({
    name: "" || null,
    template_id: "" || null,
    category: "" || null,
    url: "" || null,
    size: "" || null,
    photo: [""],
  });
  //qr codeimage
  const [qrCode, setQrCode] = useState(null);
  const handleClick = (e) => {
    const value = e.target.value;
    if (e.target.name === "template_id") {
      const template = templateList.filter((x) => {
        return (
          x.text.replace(/[^a-zа-яё]/gi, "") ===
          e.target.value.replace(/[^a-zа-яё]/gi, "")
        );
      });

      setQrData({
        ...qrData,
        [e.target.name]: template[0]._id,
      });
      console.log(qrData);
      return;
    }
    setQrData({
      ...qrData,
      [e.target.name]: value,
    });
    console.log(qrData);
  };

  // load files
  const [fileSelected, setFileSelected] = useState([]);
  const uploadMultiFiles = (e) => {
    const files = Array.from(e.target.files);
    setFileSelected(files);
    setQrData({ ...qrData, photo: imageUploaded() });
  };
  useEffect(() => {
    setQrData({ ...qrData, photo: photos });
    console.log(qrData);
  }, [photos]);
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
      .then((data) => {
        const response = UserService.createQr(data);
        response
          .then((res) => {
            console.log(res);
            return res.data;
          })
          .then((data) => {
            generateQrCode(data[0]._id);
            setId(data[0].id);
          });
      })

      .catch((error) => {
        Catch(error);
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
          {/* <input
            onChange={uploadMultiFiles}
            type="file"
            id="create-photo"
            multiple
          /> */}
          {/* <label htmlFor="create-photo" className="btn-download">
            <img src={download} alt="" />
            Загрузить
            <img src={arrow} alt="" />
          </label> */}
          {/* <button onClick={setIsModal} className="btn-download">
            <img src={download} alt="" />
            Загрузить
            <img src={arrow} alt="" />
          </button> */}
          <div className="download-photo__modal-links">
            <input
              className="modal-links__input"
              onChange={(e) => {
                setPhotos([...photos, e.target.value]);
                console.log(photos);
              }}
              type="text"
              placeholder="Вставьте ссылку на изображение"
            />
            {inputLinkList.map((e) => {
              return (
                <input
                  className="modal-links__input"
                  onChange={(e) => {
                    setPhotos([...photos, e.target.value]);
                    console.log(photos);
                  }}
                  type="text"
                />
              );
            })}

            <button
              onClick={() => {
                setInputLinkList([...inputLinkList, ""]);
                console.log(inputLinkList);
              }}
            >
              Добавить поле
            </button>
          </div>
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
