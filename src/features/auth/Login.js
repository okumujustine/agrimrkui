import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";

import { loginUser } from "../../redux/actions/auth/authActions";

function Login({ loginUser, authState }) {
  const [value, setValue] = React.useState();
  const [password, setPassword] = React.useState("");

  const userData = {
    contact: value,
    password,
  };

  const { isAuthenticated } = authState;

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{ height: "70vh" }}
    >
      <div className="mb-4 w-5/12">
        <label
          className="block text-agrisolidgreen text-sm font-bold mb-2"
          htmlFor="password"
        >
          Contact
        </label>
        <PhoneInput
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder="contact"
          country="UG"
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="mb-3 w-5/12">
        <label
          className="block text-agrisolidgreen text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******************"
        />
      </div>
      <button
        className="bg-agrisolidgreen text-agribackgroung w-5/12 p-2 rounded font-bold"
        onClick={() => loginUser(userData)}
      >
        Login
      </button>
      <p className="font-medium pt-5">
        Don't have an account?, sign up here{" "}
        <Link
          to="/register"
          className="underline text-agrisolidgreen font-bold"
        >
          sign up
        </Link>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, { loginUser })(Login);
