import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { private_socket, baseUrl } from "../../common/constants";
import Consultation from "./consultation";
import axios from "axios";
import { setUnreadMessages } from "../consultation/presenters/chatActions";

function ChatArea({ authState }) {
  const { isAuthenticated, user } = authState;
  let location = useLocation();
  const { state } = location;

  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [loadingMessages, setLoadingMessages] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated && user && location) {
      setLoadingMessages(true);
      axios
        .get(
          `${baseUrl}/consultation/chatmessages?sender=${user.phone}&receiver=${state.phone}`
        )
        .then((res) => {
          setLoadingMessages(false);
          setMessages(res.data);
        })
        .catch((error) => {
          setLoadingMessages(false);
        });
    }
  }, [authState, location]);

  React.useEffect(() => {
    getMessages();
  }, [messages.length]);

  const registerChatUser = (userToRegister) => {
    private_socket.emit("username", userToRegister.phone);
  };

  if (isAuthenticated && user) {
    registerChatUser(user);
  } else {
    console.log("Not Logged in");
  }

  const getMessages = () => {
    private_socket.on("new_private_message", (privateMsg) => {
      setMessages([...messages, privateMsg]);
    });
  };

  const onSendMessage = (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      if (message !== "") {
        setMessage("");
        private_socket.emit("private_message", {
          sender: user.phone,
          reciever: state.phone,
          message: message,
        });
        setMessages([
          ...messages,
          { sender: user.phone, reciever: state.phone, message: message },
        ]);
      } else {
        alert("Please Add A Message");
      }
    } else {
      console.log("login first");
    }
  };

  const onScrollToBottom = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setUnreadMessages();
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="w-5/12">
        <Consultation
          showChat={true}
          selectedUser={state.phone}
          setUnreadMessages={setUnreadMessages}
          messages={messages}
        />
      </div>
      <div
        className="bg-white w-full px-4 py-2 flex flex-col relative"
        style={{ height: "85vh" }}
      >
        <div>
          {state ? (
            <h5>
              {state.name}
              <small>
                <b> ({state.phone})</b>
              </small>
            </h5>
          ) : null}
        </div>
        {state ? (
          <div
            className="flex flex-col p-2 h-full w-full overflow-y-scroll mb-16"
            onScroll={onScrollToBottom}
          >
            {!loadingMessages && messages.length > 0 ? (
              messages.map((msg, index) => {
                return (
                  <div key={index}>
                    {user && user.phone === msg.sender ? (
                      <div
                        className={
                          state && state.phone === msg.reciever
                            ? "bg-gray-200 rounded-md px-4 py-1 max-w-sm float-left mx-2 mb-1"
                            : "hidden"
                        }
                      >
                        <p className="text-black">{msg.message}</p>
                      </div>
                    ) : (
                      <div
                        className={
                          state && state.phone === msg.sender
                            ? "bg-green-200 rounded-md px-4 py-1 max-w-sm float-right mx-2 mb-1 block"
                            : "hidden"
                        }
                      >
                        <p className="text-black">{msg.message}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p>no message yet</p>
            )}
          </div>
        ) : (
          <i>
            <b>select an agronomist to start chatting</b>
          </i>
        )}
        <div className="absolute bottom-0 mb-2 w-full">
          {state ? (
            <form onSubmit={onSendMessage}>
              <input
                onChange={(e) => setMessage(e.target.value)}
                placeholder="send message"
                className="border-2 h-10 rounded-md px-4 focus:outline-none"
                value={message}
                name="type message here .."
                style={{ width: "90%" }}
                onClick={setUnreadMessages}
              />
              <button
                className="focus:outline-none rounded-md border-2 border-agrisolidgreen bg-agrisolidgreen text-white px-4 h-10 ml-2"
                type="submit"
              >
                send
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, null)(ChatArea);
