import * as React from "react";
import io from "socket.io-client";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./ScrollBar.css";
import { baseUrl, private_socket } from "../../common/constants";
import ChatSvg from "./ChatSvg";

function Consultation({ authState, showChat, selectedUser }) {
  const { isAuthenticated, user } = authState;

  const [agronomists, setAgronomists] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/auth/user/agronomist`)
      .then((res) => {
        setAgronomists(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const registerChatUser = (userToRegister) => {
    private_socket.emit("username", userToRegister.phone);
  };

  if (isAuthenticated && user) {
    registerChatUser(user);
  } else {
    console.log("Not Logged in");
  }

  return (
    <div
      className={!showChat ? "flex mx-5 justify-between" : "flex flex-col mx-5"}
    >
      <div className={!showChat ? "w-3/12" : null}>
        <h5 className="text-xl pb-2 text-purple-500">start chatting ....</h5>
        {agronomists.map((agronomist) => {
          return (
            <React.Fragment key={agronomist.id}>
              <div
                className={
                  user && user.phone === agronomist.phone ? "hidden" : "block"
                }
              >
                <Link
                  to={{
                    pathname: `/chat/${agronomist.phone}`,
                    state: agronomist,
                  }}
                  className={
                    user && selectedUser === agronomist.phone
                      ? `mb-2 max-w-xs  border-2 border-agrisolidgreen rounded-md px-4 py-2 flex flex-row justify-between cursor-pointer bg-gray-200 hover:bg-gray-200`
                      : `mb-2 bg-white max-w-xs  border-2 border-agrisolidgreen rounded-md px-4 py-2 flex flex-row justify-between cursor-pointer hover:bg-gray-100`
                  }
                >
                  <div className="bg-black rounded-full h-12 w-12"></div>
                  <div className="flex flex-col">
                    <h5 className="capitalize">{agronomist.name}</h5>
                    <small>
                      <b>{agronomist.phone}</b>
                    </small>
                  </div>
                  <div>
                    <i className="fas fa-angle-right text-5xl"></i>
                  </div>
                </Link>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {!showChat ? (
        <div className="w-7/12">
          <ChatSvg />
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, null)(Consultation);
