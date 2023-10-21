import "./style.css";

const ProductField = (props) => {
  return (
    <div className="input-block">
      <h2 className="input-block__title">{props.title}</h2>
      <div className="input-id">{props.text}</div>
    </div>
  );
};

export { ProductField };
