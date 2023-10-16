
import { Input } from "Components/UI/input";
import "./App.css";
import { ButtonCreateQr, ButtonDisableQr, ButtonEnter } from "Components/UI/buttons";
import { RouterProvider } from "react-router-dom";
import { router } from "Components/route/route";
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
