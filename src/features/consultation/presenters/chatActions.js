export function getMessageCountByPhone(messages, agronomist, loggedInUser) {
  if (messages && agronomist && loggedInUser) {
    let unreadMessagesCount = messages.filter((msg) => {
      return (
        msg.reciever === loggedInUser.phone &&
        msg.sender === agronomist.phone &&
        msg.read === 0
      );
    });
    return unreadMessagesCount.length;
  }

  return 0;
}

function getUnreadMessages(messages, agronomist, loggedInUser) {
  return new Promise(function (resolve, reject) {
    let readMessages = [];
    if (messages && agronomist && loggedInUser) {
      let unreadMessages = messages.filter((msg) => {
        return (
          (msg.reciever === loggedInUser.phone &&
            msg.sender === agronomist.phone) ||
          (msg.reciever === agronomist.phone &&
            msg.sender === loggedInUser.phone)
        );
      });

      unreadMessages.map((unreadMessage) => {
        if (
          unreadMessage.read === 0 &&
          unreadMessage.reciever === loggedInUser.phone
        ) {
          readMessages.push({
            id: unreadMessage.id,
            message: unreadMessage.message,
            read: 1,
            reciever: unreadMessage.reciever,
            sender: unreadMessage.sender,
          });
        } else {
          readMessages.push(unreadMessage);
        }
      });

      resolve(readMessages);
    }
    reject(readMessages);
  });
}

export function setUnreadMessages(messages, agronomist, loggedInUser) {
  return new Promise(function (resolve, reject) {
    getUnreadMessages(messages, agronomist, loggedInUser)
      .then((readMessages) => {
        if (readMessages.length > 0) {
          return resolve(readMessages);
        }
        return reject([]);
      })
      .catch((error) => console.log(`error ${JSON.stringify(error)}`));
  });
}
