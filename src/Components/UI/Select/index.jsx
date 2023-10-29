import "./style.css";

const Select = ({ name, options, label, placeholder, handleClick }) => (
  <div className="input-block">
    <h2 className="input-block__title">{label}</h2>

    <select onChange={handleClick} name={name}>
      <option value="">{placeholder}</option>
      {options.map((option) => {
        return <option value={option}>{option}</option>;
      })}
    </select>
  </div>
);

export { Select };
