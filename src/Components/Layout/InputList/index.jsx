import "./style.css";
import { Select } from "Components/UI/Select";
import gen from "assets/images/icons/generate.svg";
import { useState } from "react";

const inputMass = [
  {
    label: "название товара",
    placeholder: "Выберите товар",
  },
  {
    label: "категория товара",
    placeholder: "Выберите категорию",
  },
  {
    label: "размера товара",
    placeholder: "Выберите размер",
  },
  {
    label: "цвет",
    placeholder: "Выберите цветовую палитру",
  },
  {
    label: "материал",
    placeholder: "Выберите материалы",
  },
  {
    label: "описание товара",
    placeholder: "Выберите описание",
  },
  {
    label: "добавление тэгов",
    placeholder: "Выберите основные тэги",
  },
];

const InputList = () => {
  const [id, setId] = useState("");

  function GenerateId() {
    setId(Math.floor(Math.random() * (999999999 - 100000000) + 100000000));
  }

  return (
    <>
      <section className="input-list">
        {inputMass.map((elem, i) => {
          return (
            <div key={i}>
              <Select label={elem.label} placeholder={elem.placeholder} />
            </div>
          );
        })}
        <div className="input-block">
          <h2></h2>
          <div className="input-block__bottom input-id">
            <input
              onChange={(e) => setId(e.target.value)}
              value={id}
              type="text"
              placeholder="Введите идентефикатор"
            />
            <button onClick={() => console.log(GenerateId())}>
              <img src={gen} alt="" />
              Сгенерировать
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export { InputList };
