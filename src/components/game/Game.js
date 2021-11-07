import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";

import Tasks from "../tasks/Tasks";
import Shop from "../shop/Shop";

import "./game.css";

const Game = (props) => {
  const [stats, setStats] = useState({
    lives: props.game.lives,
    gold: props.game.gold,
    score: props.game.score,
  });
  const [tasks, setTasks] = useState([]);
  const [taskSolve, setTaskSolve] = useState({
    success: false,
    lives: 0,
    gold: 0,
    score: 0,
    highScore: 0,
    turn: 0,
    message: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [isShowing, setIsShowing] = useState({
    showShop: false,
    showTasks: false,
    showGameOver: false,
  });
  const [itemPurchased, setItemPurchased] = useState({
    name: "",
    gold: 0,
    level: 0,
    lives: 0,
    shoppingSuccess: false,
    turn: 0,
  });

  useEffect(() => {
    axios
      .post("https://dragonsofmugloar.com/api/v2/game/start")
      .then((res) =>
        setStats({
          lives: res.data.lives,
          gold: res.data.gold,
          score: res.data.score,
        })
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(
      `https://dragonsofmugloar.com/api/v2/${localStorage.getItem(
        "gameId"
      )}/messages`
    )
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  const fetchSolvedTask = async (task) => {
    const response = await fetch(
      `https://dragonsofmugloar.com/api/v2/${localStorage.getItem(
        "gameId"
      )}/solve/${task.adId}`,
      { method: "POST" }
    );
    const data = await response.json();
    setTaskSolve({
      success: data.success,
      lives: data.lives,
      gold: data.gold,
      score: data.score,
      highScore: data.highScore,
      turn: data.turn,
      message: data.message,
    });
    setStats({
      lives: data.lives,
      gold: data.gold,
      score: data.score,
    });
    if (data.lives > 0) {
      fetchTasks();
      setShowModal(true);
    } else {
      setIsShowing({ ...isShowing, showGameOver: true });
    }
  };

  const openTasks = () => {
    setIsShowing({
      ...isShowing,
      showTasks: !isShowing.showTasks,
    });
  };
  const openShop = () => {
    setIsShowing({ ...isShowing, showShop: !isShowing.showShop });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeBuyModal = () => {
    setShowBuyModal(false);
  };

  // const startTask = (task) => {
  //   let baby = Math.random() < 1;
  //   let amateur = Math.random() < 0.9;
  //   let easy = Math.random() < 0.7;
  //   let medium = Math.random() < 0.5;
  //   let hard = Math.random() < 0.3;
  //   let pro = Math.random() < 0.1;

  //   if (
  //     task.probability === "Walk in the park" &&
  //     baby &&
  //     task.expiresIn > 0 &&
  //     stats.lives > 0
  //   ) {
  //     setShowModal(true);
  //     setResult(true);
  //     task.expiresIn = task.expiresIn - 1;
  //     setStats({
  //       ...stats,
  //       gold: stats.gold + task.reward,
  //       score: stats.score + task.reward,
  //     });
  //   } else if (
  //     task.probability === "Piece of cake" &&
  //     amateur &&
  //     task.expiresIn > 0 &&
  //     stats.lives > 0
  //   ) {
  //     setShowModal(true);
  //     setResult(true);
  //     task.expiresIn = task.expiresIn - 1;
  //     setStats({
  //       ...stats,
  //       gold: stats.gold + task.reward,
  //       score: stats.score + task.reward,
  //     });
  //   } else if (
  //     task.probability === "Sure thing" &&
  //     easy &&
  //     task.expiresIn > 0 &&
  //     stats.lives > 0
  //   ) {
  //     setShowModal(true);
  //     setResult(true);
  //     task.expiresIn = task.expiresIn - 1;
  //     setStats({
  //       ...stats,
  //       gold: stats.gold + task.reward,
  //       score: stats.score + task.reward,
  //     });
  //   } else if (
  //     task.probability === "Quite likely" &&
  //     medium &&
  //     task.expiresIn > 0 &&
  //     stats.lives > 0
  //   ) {
  //     setShowModal(true);
  //     setResult(true);
  //     task.expiresIn = task.expiresIn - 1;
  //     setStats({
  //       ...stats,
  //       gold: stats.gold + task.reward,
  //       score: stats.score + task.reward,
  //     });
  //   } else if (
  //     task.probability === "Hmmm...." ||
  //     (task.probability === "Gamble" &&
  //       hard &&
  //       task.expiresIn > 0 &&
  //       stats.lives > 0)
  //   ) {
  //     setShowModal(true);
  //     setResult(true);
  //     task.expiresIn = task.expiresIn - 1;
  //     setStats({
  //       ...stats,
  //       gold: stats.gold + task.reward,
  //       score: stats.score + task.reward,
  //     });
  //   } else if (
  //     task.probability === "Rather detrimental" &&
  //     pro &&
  //     task.expiresIn > 0 &&
  //     stats.lives > 0
  //   ) {
  //     setShowModal(true);
  //     setResult(true);
  //     task.expiresIn = task.expiresIn - 1;
  //     setStats({
  //       ...stats,
  //       gold: stats.gold + task.reward,
  //       score: stats.score + task.reward,
  //     });
  //   } else {
  //     if (task.expiresIn > 0 && stats.lives > 0) {
  //       task.expiresIn = task.expiresIn - 1;
  //       setResult(false);
  //       setShowModal(true);
  //       setStats({
  //         ...stats,
  //         lives: stats.lives - 1,
  //       });
  //     }
  //     if (stats.lives === 0) {
  //       setIsShowing({ ...isShowing, showGameOver: true });
  //     }
  //   }
  // };

  const startTask = (task) => {
    fetchSolvedTask(task);
  };

  const restart = () => {
    window.location.reload(false);
    localStorage.clear();
  };

  const purchase = async (item) => {
    const response = await fetch(
      `https://dragonsofmugloar.com/api/v2/${localStorage.getItem(
        "gameId"
      )}/shop/buy/${item.id}`,
      { method: "POST" }
    );
    const data = await response.json();
    setStats({
      ...stats,
      lives: data.lives,
      gold: data.gold,
    });
    setItemPurchased({
      name: item.name,
      gold: data.gold,
      level: data.level,
      lives: data.lives,
      shoppingSuccess: data.shoppingSuccess,
      turn: data.turn,
    });
    console.log(data);
    setShowBuyModal(true);
  };

  return (
    <div className="container">
      <div className="dashboard">
        <div className="name">
          <span>{localStorage.getItem("username")}</span>
        </div>
        <div className="stats">
          <div className="stats-item">
            Lives: <span className="stats-value">{stats.lives}</span>{" "}
          </div>
          <div className="stats-item">
            Gold: <span className="stats-value">{stats.gold}</span>
          </div>
          <div className="stats-item">
            Score: <span className="stats-value">{stats.score}</span>
          </div>
        </div>
      </div>

      <div className="game-container">
        {isShowing.showTasks ? (
          <Tasks
            tasks={tasks}
            back={openTasks}
            startTask={startTask}
            taskSolve={taskSolve}
            showModal={showModal}
            closeModal={closeModal}
          />
        ) : (
          <div className={isShowing.showShop ? "hidden" : ""}>
            <button className="message-btn" onClick={openTasks}>
              Messages
              <p className="btn-text">Help people in need</p>
            </button>
          </div>
        )}
        {isShowing.showShop ? (
          <Shop
            purchase={purchase}
            showBuyModal={showBuyModal}
            closeBuyModal={closeBuyModal}
            back={openShop}
            itemPurchased={itemPurchased}
            stats={stats}
          />
        ) : (
          <div className={isShowing.showTasks ? "hidden" : ""}>
            <button className="shop-btn" onClick={openShop}>
              Shop
              <p className="btn-text">Increase your lives</p>
            </button>
          </div>
        )}
      </div>
      {isShowing.showGameOver ? (
        <ReactModal
          isOpen={true}
          contentLabel="onRequestClose"
          onRequestClose={props.closeModal}
          shouldCloseOnOverlayClick={true}
          className="Modal"
        >
          <div className="fail-modal">
            <h1>{taskSolve.message}</h1>
            <button className="restart-btn start" onClick={restart}>
              Restart
            </button>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};

export default Game;
