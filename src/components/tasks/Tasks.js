import ReactModal from "react-modal";

import "./tasks.css";

ReactModal.setAppElement("#root");

const Tasks = (props) => {
  return (
    <div>
      <button className="back-btn" onClick={props.back}>
        Go back
      </button>

      <div className="task-container">
        {props.tasks.map((task) => (
          <div className="task" key={task.adId}>
            <div className="task-item difficulty">{task.probability}</div>
            <div className="task-item description">{task.message}</div>
            <div className="task-item reward">
              Reward: <span className="gold">{task.reward}</span> gold
            </div>

            <button
              className="start"
              onClick={() => {
                props.startTask(task);
              }}
            >
              Start
            </button>
          </div>
        ))}
      </div>

      <ReactModal
        isOpen={props.showModal}
        contentLabel="onRequestClose"
        onRequestClose={props.closeModal}
        shouldCloseOnOverlayClick={true}
        className="Modal"
      >
        {props.taskSolve.success ? (
          <div className="success-modal">
            <h1>{props.taskSolve.message}</h1>
          </div>
        ) : (
          <div className="fail-modal">
            <h1>{props.taskSolve.message}</h1>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default Tasks;
