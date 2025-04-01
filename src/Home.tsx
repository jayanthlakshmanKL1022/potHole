import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./component/Search";
import Navbar from "./component/navbar";
import "./home.css";
import { RouteComponentProps } from "@reach/router";
import { io } from "socket.io-client";

interface Chat {
  _id: string;
  chatName: string;
}

interface Message {
  _id: string;
  sender: string;
  content: string;
}

const ENDPOINT = "http://localhost:5500";

const ChatApp: React.FC<RouteComponentProps> = () => {

  const [chats, setChats] = useState<Chat[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [newChatName, setNewChatName] = useState<string>("");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [id, setMyId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<any>();
  const [socket, setSocket] = useState<any>(null);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5500/myprofile/mydetails", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setMyId(response.data._id);
        const fullName = `${response.data.firstName} ${response.data.lastName}`;
        setName(fullName);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(newSocket);
  
    if (user && user._id) {
      newSocket.emit("setup", user._id);
      newSocket.on("connected!", () => {
        console.log("Socket connection established");
      });
    }
  
    return () => {
      newSocket.disconnect();
    };
  }, [user]);  // Keep user as dependency
  
  useEffect(() => {
    if (socket) {
      socket.on("messagereceived", (message: Message) => {
        if (message && selectedChatId === message._id) {  // Add chat ID verification
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
  
      return () => {
        socket.off("messagereceived");
      };
    }
  }, [socket, selectedChatId]);  // Add selectedChatId as dependency
  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return console.error("No auth token found");

      const response = await axios.get("http://localhost:5500/fetch_c/mychats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  
  const fetchMessages = async (chatId: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`http://localhost:5500/fetch/fetchmessages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.messages || []);
      socket.emit("joinchat", chatId); 
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]); 
    }
  };

  useEffect(() => {
    if (selectedChatId) {
      fetchMessages(selectedChatId);
    }
  }, [selectedChatId]);

  const createChat = async (userId: string) => {
    if (!userId) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:5500/createchat/accesschat",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setChats((prevChats) => [...prevChats, response.data]);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage || !selectedChatId) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:5500/send/sendmessage",
        { chatId: selectedChatId, content: newMessage },
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );
      setMessages((prevMessages) => [...prevMessages, response.data]);
      socket.emit("newmessage", {
        chatId: selectedChatId,
        message: response.data,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
 
    fetchChats();
  }, []);

  const renameChat = async () => {
    if (!selectedChatId || !newChatName) return;
    try {
      await axios.post("http://localhost:5500/name/rename", {
        chatId: selectedChatId,
        newChatName,
      });
      fetchChats(); // Refresh the chat list
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };
  return (
    <div className="page-reset">
      <div className="container">
        <div className="left">
          <Navbar />
        </div>
        <div className="center">
          <b>
            <p style={{ color: "white", fontSize: "21px", marginBottom: "20px" }}>
              Direct Messages
            </p>
          </b>
          <div className="search-container">
            <Search setUsers={setSearchResults} />
            <ul className="dropdown">
              {searchResults.map((user) => (
                <li key={user._id}>
                  {user.firstName && user.lastName && `${user.firstName} ${user.lastName}` !== name && (
                    <p style={{ color: "black" }}>{user.firstName} {user.lastName}</p>
                  )}
                  <button onClick={() => createChat(user._id)}>Create Chat</button>
                </li>
              ))}
            </ul>
          </div>
          <h2 style={{ marginTop: "20px" }}>My Chats</h2>
          <ul>
  {chats.map((chat) => {
    const chatNameParts = chat.chatName.split(", "); // Split by comma and space
    const loggedInFullName = name 
    const otherUserName = chatNameParts.find(n => n !== loggedInFullName) || chatNameParts[0]; // Find the other user's name

    return (
      <li key={chat._id} onClick={() => setSelectedChatId(chat._id)} style={{ cursor: "pointer", listStyle: "none" }}>
        <p >{otherUserName}</p>
      </li>
    );
  })}
</ul>

          {selectedChatId && (
            <div>
              <input
                type="text"
                placeholder="New Chat Name"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
              />
              <button onClick={renameChat}>Rename Chat</button>
            </div>
          )}
        </div>
        <div className="right">
  {selectedChatId ? (
    <div className="chat-container">
      {/* Find the chat object for the selected chatId */}
      {(() => {
        const selectedChat = chats.find((chat) => chat._id === selectedChatId);
        if (!selectedChat) return <h2>Chat</h2>;

        const chatNameParts = selectedChat.chatName.split(", ");
        const otherUserName = chatNameParts.find(n => n !== name) || chatNameParts[0]; 

        return <h2>{otherUserName}</h2>;
      })()}
      <hr style={{marginTop:'10px'}}></hr>
              <div className="messages">
                {messages.map((msg) => (
                  <div key={msg._id} className={msg.sender === id ? "sent-message" : "received-message"}>
                    {msg.content}
                  </div>
                ))}
              </div>
              <div className="message-input-container">
                <button className="icon-button">📎</button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="chat-input"
                />
                  <button className="send-button" onClick={sendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="white"
          >
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
              </div>
            </div>
          ) : (
            <p>Select a chat to start messaging</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

