import buttonEnter from "Components/UI/buttons";
import "./App.css";
function App() {
  return (
    <>
      <h1>Заголовок 1</h1>
      <h2>Заголовок 2</h2>
      <h3>Заголовок 3</h3>
      <h4>Заголовок 4</h4>
      <h5>Заголовок 5</h5>
      <p>Текст рыба обычный текст</p>
      <buttonEnter></buttonEnter>
      <input type="text" />
      <select name="select" id="select_id">
        <option value="" key="" selected>
          опция 1
        </option>
        <option value="" key="">
          опция 2
        </option>
        <option value="" key="">
          опция 3
        </option>
      </select>
    </>
  );
}

export default App;
