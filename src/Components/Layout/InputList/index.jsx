import "./style.css";
import { Select } from "Components/UI/Select";
import { InputId } from "Components/UI/input";
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
  return (
    <>
      <section className="input-list">
        {inputMass.map((elem) => {
          return (
            <>
              <Select label={elem.label} placeholder={elem.placeholder} />
            </>
          );
        })}
        <InputId type="text" placeholder="Введите идентификатор товара" />
      </section>
    </>
  );
};
export { InputList };
