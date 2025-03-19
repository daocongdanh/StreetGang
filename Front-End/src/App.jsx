import { useEffect } from "react";
import "./App.css";
import useRouteElement from "./routes/useRouteElement";
import { getUserById } from "./services/userService";

function App() {
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getUserById("67d057e6123e9709dded1adb");
      localStorage.setItem("user", JSON.stringify(response.data));
    };
    fetchApi();
  }, []);
  const element = useRouteElement();
  return element;
}

export default App;
