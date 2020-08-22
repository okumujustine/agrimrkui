import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { loginUser } from "../../redux/actions/auth/authActions";

function Login({ loginUser, authState, history }) {
  const [contact, setContact] = React.useState("");
  const [password, setPassword] = React.useState("");

  const userData = {
    contact,
    password,
  };

  const { isAuthenticated } = authState;

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="home">
      <div>
        <input
          placeholder="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        ></input>
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={() => loginUser(userData)}>Login</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, { loginUser })(Login);
