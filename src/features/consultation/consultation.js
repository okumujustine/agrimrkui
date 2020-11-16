import * as React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./ScrollBar.css";
import { baseUrl, private_socket } from "../../common/constants";
import ChatSvg from "./ChatSvg";
import { getLoggedInToken, appTokenConfig } from "../../helperfuncs/getToken";

function Consultation({
  authState,
  showChat,
  selectedUser,
  setUnreadMessages,
}) {
  const { isAuthenticated, user } = authState;

  const [agronomists, setAgronomists] = React.useState([]);

  const getUserLising = (user, loginStatus) => {
    if (loginStatus && user === "normal") {
      getUserListingApi(`${baseUrl}/auth/user/agronomist/auth`, true);
    } else {
      getUserListingApi(`${baseUrl}/auth/user/agronomist`, false);
    }
  };

  const getUserListingApi = async (url, token) => {
    let loggedInToken;

    if (token) {
      loggedInToken = await getLoggedInToken();
    }

    axios
      .get(url, appTokenConfig(loggedInToken))
      .then((res) => {
        setAgronomists(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (isAuthenticated && user) {
      getUserLising("normal", true);
    } else if (isAuthenticated !== null) {
      getUserLising("normal", false);
    }
  }, [authState]);

  const registerChatUser = (userToRegister) => {
    private_socket.emit("username", userToRegister.phone);
  };

  if (isAuthenticated && user) {
    registerChatUser(user);
  } else {
    // console.log("Not Logged in");
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
                onClick={setUnreadMessages}
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
                    {agronomist.unread_count ? (
                      <span>{agronomist.unread_count}</span>
                    ) : null}{" "}
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
