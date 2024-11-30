import { useState } from "react";

function Login(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        if(username !== "" && password !== ""){
            props.logIn(username, password);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="login-sign-up">
        <h2>
          Login
        </h2>
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          name="text"
          autoComplete="off"
          value={username}
          onChange={handleUsernameChange}
        />
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          name="text"
          autoComplete="off"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">
          Login
        </button>
      </form>
    );
}

export default Login;