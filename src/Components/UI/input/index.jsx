import "./style.css";
import gen from "assets/images/icons/generate.svg";
const Input = (props) => {
  return (
    <div className="input-block">
      <h2 className="input-block__title">{props.label}</h2>
      <input
        type={props.type}
        className="input-id"
        placeholder={props.placeholder}
      />
    </div>
  );
};
const InputId = (props, { handleClick }) => {
  return (
    <div className="input-block">
      <h2 className="input-block__title">{props.label}</h2>
      <div className="input-block__bottom input-id">
        <input
          value={props.value}
          type={props.type}
          placeholder={props.placeholder}
        />
        <button onClick={handleClick}>
          <img src={gen} alt="" />
          Сгенерировать
        </button>
      </div>
    </div>
  );
};

export { Input, InputId };
