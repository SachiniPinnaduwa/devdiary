import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .get("/")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <div>DevDiary Frontend</div>;
}

export default App;
