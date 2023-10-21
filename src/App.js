import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "Components/route/route";
function App() {
  return <RouterProvider router={router} />;
}

export default App;
