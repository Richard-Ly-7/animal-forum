import { useState, useEffect } from "react";

function SignUp(props){

  useEffect(()=>{
    console.log(props.userDoesNotExist)
  });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [attemptedLogIn, setAttemptedLogIn] = useState(false);

    function handleUsernameChange(event){
      setUsername(event.target.value);
    }

    function handlePasswordChange(event){
      setPassword(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        if(username !== "" && password !== ""){
          setAttemptedLogIn(true);
          const userExists = props.signUp(username, password);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="login-sign-up">
        <h2>
          Sign Up
        </h2>
        <label for="username">Username:</label>
        <input
          id="username"
          type="text"
          name="text"
          autoComplete="off"
          value={username}
          onChange={handleUsernameChange}
        />
        <label for="password">Password:</label>
        <input
          type="password"
          name="text"
          autoComplete="off"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">
          Sign Up
        </button>
        <p>{ 
          // attemptedLogIn ?
          //   (props.userDoesNotExist ?
          //     "Account created." : "That username has already been taken."
          //   )
          // : ""
        }
        </p>
      </form>
    );
}

export default SignUp;