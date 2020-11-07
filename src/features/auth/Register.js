import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";

import "./LoginRegister.css";
import { registerUser } from "../../redux/actions/auth/authActions";

function Register({ registerUser, authState }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [value, setValue] = React.useState();
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [region, setRegion] = React.useState("");

  const userData = {
    name,
    country: "uganda",
    region,
    district,
    contact: value,
    email,
    password,
    status: 1,
    role: "customer",
    confirm,
  };

  const { isAuthenticated } = authState;

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  const register = (d) => {
    registerUser(d);
  };

  return (
    <div style={{ height: "65vh" }}>
      <div className="flex flex-col -mx-3 mb-6 justify-center items-center">
        <div className="w-7/12 px-3">
          <label
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2 "
            htmlFor="grid-password"
          >
            Full name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="e.g okumu justine"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex w-7/12">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2 "
              htmlFor="grid-region"
            >
              Region
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Region</option>
                <option value="northern">Northen</option>
                <option value="eastern">Eastern</option>
                <option value="western">Western</option>
                <option value="central">Central</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-district"
            >
              District
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-district"
              type="text"
              placeholder="e.g gulu"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-7/12">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2 "
              htmlFor="grid-contact"
            >
              Contact
            </label>
            <PhoneInput
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="e.g 0781459239"
              country="UG"
              value={value}
              onChange={setValue}
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="text"
              placeholder="e.g okumujustine01@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-7/12">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2 "
              htmlFor="grid-pswd"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-pswd"
              type="password"
              placeholder="e.g 123456Res"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-cpswd"
            >
              Confirm password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-cpswd"
              type="password"
              placeholder="e.g 123456Res"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-7/12 px-3 mt-6">
          <button
            className="bg-agrisolidgreen text-agribackgroung w-full p-2"
            onClick={() => register(userData)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, { registerUser })(Register);
