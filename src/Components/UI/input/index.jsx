import "./style.css";

const Input = (props) => {
  return (
    <div className="input-block">
      <h2 className="input-block__title">{props.label}</h2>
      <input type="text" className="input-id" placeholder={props.text} />
    </div>
  );
};

export { Input };
