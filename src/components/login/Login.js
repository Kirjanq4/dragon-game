import React from "react";

import "./login.css";

const Login = (props) => {
  return (
    <div className="login-container">
      <input
        type="text"
        value={props.inputValue}
        onChange={props.handleChange}
        placeholder="Name"
      />
      <input type="submit" value="Start Game" onClick={props.onSubmit} />
    </div>
  );
};

export default Login;
