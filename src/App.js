import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Game from "./components/game/Game";
import Login from "./components/login/Login";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [game, setGame] = useState({});

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    axios
      .post("https://dragonsofmugloar.com/api/v2/game/start")
      .then((res) => setGame(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = () => {
    localStorage.setItem("gameId", game.gameId);
    localStorage.setItem("username", inputValue);
    setInputValue("");
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/">
            <img
              className="header-logo"
              src="https://dragonsofmugloar.com/assets/logo.png"
              alt=""
            />
          </a>
        </div>

        <div>
          {localStorage.getItem("gameId") ? (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          ) : null}
        </div>
      </header>
      <div>
        {localStorage.getItem("gameId") ? (
          <Game game={game} />
        ) : (
          <Login
            handleChange={handleChange}
            onSubmit={onSubmit}
            inputValue={inputValue}
          />
        )}
      </div>
      <footer>&copy; Kirill Durunda</footer>
    </div>
  );
}

export default App;
