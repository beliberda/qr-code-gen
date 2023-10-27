import "./style.css";

const Select = (props) => {
  return (
    <div className="input-block">
      <h2 className="input-block__title">{props.label}</h2>

      <select name="" id="">
        <option value="">{props.placeholder}</option>
      </select>
    </div>
  );
};

export { Select };
