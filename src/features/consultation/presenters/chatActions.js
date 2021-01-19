export function getMessageCountByPhone(messages, agronomist, loggedInUser) {
  if (messages && agronomist && loggedInUser) {
    let unreadMessagesCount = messages.filter((msg) => {
      return (
        msg.reciever === loggedInUser.phone && msg.sender === agronomist.phone
      );
    });
    return unreadMessagesCount.length;
  }

  return 0;
}

export function setUnreadMessages() {
  console.log("set unread messages");
}
