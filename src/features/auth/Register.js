import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LoginRegister.css";
import { registerUser } from "../../redux/actions/auth/authActions";

function Register({ registerUser, authState }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [region, setRegion] = React.useState("");

  const userData = {
    name,
    country,
    region,
    district,
    contact,
    email,
    password,
    status: 1,
    role: "agronomist",
    confirm,
  };

  const { isAuthenticated } = authState;

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="home">
      register user
      <div className="auth_registerContainer">
        <div className="auth_firstLastName">
          <input
            className="auth_firstName percent_94 margin_10 height_40"
            placeholder="Name"
            value={name}
            name="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            className="auth_lastName percent_94 height_40"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>
        <div className="auth_contryDistrict">
          <input
            className="percent_94 margin_10 height_40"
            placeholder="Country"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          ></input>
          <input
            className="percent_94 height_40"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          ></input>
        </div>
        <div className="auth_passwordConfirm">
          <input
            className="percent_100 height_40 margin_10"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          ></input>
          <input
            className="percent_100 height_40"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="auth_passwordConfirm">
          <input
            className="percent_100 margin_10 height_40"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            className="percent_100 height_40"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          ></input>
        </div>
        <button className="auth_button" onClick={() => registerUser(userData)}>
          Register
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, { registerUser })(Register);
