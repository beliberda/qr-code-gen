import "./style.css";

const Select = ({ id, name, options, label, placeholder, handleClick }) => (
  <div key={id} className="input-block">
    <h2 className="input-block__title">{label}</h2>

    <input
      className="input-block__select"
      placeholder={placeholder}
      type="text"
      list="name"
      onChange={handleClick}
      name={name}
    />
    <datalist id={name}>
      {options.map((option) => {
        return <option value={option}>{option}</option>;
      })}
    </datalist>
  </div>
);

export { Select };
