import * as React from "react";
import io from "socket.io-client";

import "./ScrollBar.css";
import { connect } from "react-redux";


let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

let private_socket = io.connect(`${endPoint}/private`);


function Consultation({authState}) {
  const {isAuthenticated, user} = authState

  const [messages, setMessages] = React.useState([])
  const [message, setMessage] = React.useState("")
  // const [sender, setSender] = React.useState("")
  const [reciever, setReciever] = React.useState("")

  React.useEffect(() => {
    getMessages()
  }, [messages.length])

  const getMessages = () => {
    private_socket.on('new_private_message', (privateMsg) => {
      setMessages([...messages, privateMsg])
    })
  }

    if (isAuthenticated){
      private_socket.emit('username', user.phone)
    }else{
      console.log("Not Logged in")
    }


  const onSendMessage = () => {
    if (isAuthenticated){
      if (message !== "") {
        setMessage("")
        private_socket.emit("private_message", {'sender':user.phone, 'reciever':reciever, 'message':message});
        setMessages([...messages,{'sender':user.phone, 'reciever':reciever, 'message':message}])
      } else {
        alert("Please Add A Message");
      }
    }else{
      console.log("login first")
    }
  };

  return (
    <div>
    {messages.length > 0 ?
      messages.map((msg, index) => (
        <div key={index}>
          <p>{msg.sender} - {msg.message}</p>
        </div>
      )): <p>no message yet</p>}
    <br/><br/>
    <input
     style={{border:"1px solid black"}}
      value={reciever}
      name="reciever"
      placeholder="reciever"
      onChange={e => setReciever(e.target.value)}
    />
      <input
      style={{border:"1px solid green", marginLeft:"10px"}}
      value={message}
      name="message"
      placeholder="message"
      onChange={e => setMessage(e.target.value)}
    />
    <button onClick={onSendMessage}>Send Message</button>
  </div>
  )
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, null)(Consultation);
