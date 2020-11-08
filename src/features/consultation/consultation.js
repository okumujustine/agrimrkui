import * as React from "react";
import io from "socket.io-client";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./ScrollBar.css";
import { baseUrl } from "../../common/constants";

let endPoint = "http://localhost:5000";

let private_socket = io.connect(`${endPoint}/private`);

function Consultation({ authState }) {
  const { isAuthenticated, user } = authState;

  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [reciever, setReciever] = React.useState("");
  const [agronomists, setAgronomists] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState(null);

  React.useEffect(() => {
    if (selectedChat) {
      getMessages();
    }
  }, [messages.length]);

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

  const getMessages = () => {
    private_socket.on("new_private_message", (privateMsg) => {
      setMessages([...messages, privateMsg]);
    });
  };

  const registerChatUser = (userToRegister) => {
    private_socket.emit("username", userToRegister.phone);
  };

  if (isAuthenticated) {
    registerChatUser(user);
  } else {
    console.log("Not Logged in");
  }

  const selectedAgronomist = (agronomist) => {
    setReciever(agronomist.phone);
    setSelectedChat(agronomist);
  };

  const onSendMessage = (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      if (message !== "") {
        setMessage("");
        private_socket.emit("private_message", {
          sender: user.phone,
          reciever: reciever,
          message: message,
        });
        setMessages([
          ...messages,
          { sender: user.phone, reciever: reciever, message: message },
        ]);
      } else {
        alert("Please Add A Message");
      }
    } else {
      console.log("login first");
    }
  };

  return (
    <div className="flex flex-row justify-between mx-5">
      <div className="w-3/12">
        {agronomists.map((agronomist) => (
          <React.Fragment key={agronomist.id}>
            <div
              onClick={() => selectedAgronomist(agronomist)}
              className={
                selectedChat && selectedChat.id === agronomist.id
                  ? `bg-gray-100 max-w-xs  border-2 border-gray-200 rounded-md px-4 py-2 flex flex-row justify-between cursor-pointer hover:bg-gray-100`
                  : `bg-white max-w-xs  border-2 border-gray-200 rounded-md px-4 py-2 flex flex-row justify-between cursor-pointer hover:bg-gray-100`
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
            </div>
          </React.Fragment>
        ))}
      </div>
      <div
        className="bg-white w-8/12 px-4 py-2 flex flex-col relative"
        style={{ height: "85vh" }}
      >
        <div>
          {selectedChat ? (
            <h5>
              {selectedChat.name}
              <small>
                <b> ({selectedChat.phone})</b>
              </small>
            </h5>
          ) : null}
        </div>
        {selectedChat ? (
          <div className="border-2 border-black" style={{ height: "92%" }}>
            message area
          </div>
        ) : (
          <i>
            <b>select an agronomist to start chatting</b>
          </i>
        )}
        <div className="absolute bottom-0 w-full">
          {selectedChat ? (
            <form onSubmit={onSendMessage}>
              <input
                onChange={(e) => setMessage(e.target.value)}
                placeholder="send message"
                className="border-2 px-4 py-1"
                value={message}
                name="type message here .."
                placeholder="message"
              />
              <button type="submit">send</button>
            </form>
          ) : null}
        </div>
      </div>
      {/* {messages.length > 0 ? (
        messages.map((msg, index) => (
          <div key={index}>
            <p>
              {msg.sender} - {msg.message}
            </p>
          </div>
        ))
      ) : (
        <p>no message yet</p>
      )} */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, null)(Consultation);
