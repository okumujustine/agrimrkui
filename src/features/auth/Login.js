import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";

import { loginUser } from "../../redux/actions/auth/authActions";

function Login({ loginUser, authState }) {
  const [value, setValue] = React.useState();
  const [password, setPassword] = React.useState("");

  const userData = {
    value,
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
      <div class="mb-4 w-5/12">
        <label
          class="block text-agrisolidgreen text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <PhoneInput
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder="contact"
          country="UG"
          value={value}
          onChange={setValue}
        />
      </div>
      <div class="mb-3 w-5/12">
        <label
          class="block text-agrisolidgreen text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <button
        className="bg-agrisolidgreen text-agribackgroung w-5/12 p-2 rounded font-bold"
        onClick={() => console.log(userData)}
      >
        Login
      </button>{" "}
      {/* loginUser(userData) */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, { loginUser })(Login);
