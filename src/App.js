import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [msg, setMsg] = useState();

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setMsg(data.message);
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <h2>{msg}</h2>
    </div>
  );
}

export default App;
