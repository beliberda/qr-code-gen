import "./style.css";

const Select = (props) => {
  return (
    <div className="input-block">
      <h2 className="input-block__title">{props.label}</h2>
      <select name="" id=""></select>
    </div>
  );
};

export { Select };
