import "./style.css";

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

export { Input };
