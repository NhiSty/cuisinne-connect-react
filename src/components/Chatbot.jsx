import { useState } from "react";
import botOpenImg from "../assets/botOpen.png";
import botCloseImg from "../assets/botClose.png";
import { RefreshCw, SendHorizontal } from "lucide-react";
import { fetcher } from "../api/http";
import classNames from "classnames";

export default function Chatbot() {
  // message envoyé à l'api
  const [content, setContent] = useState("");

  // chargement des données du localStorage afin de garder les discussions
  const getMessagesFromLocalStorage = () => {
    const messagesFromLocalStorage = localStorage.getItem("messages");
    if (messagesFromLocalStorage) {
      return JSON.parse(messagesFromLocalStorage);
    }
    return [];
  };

  // tableau des messages envoyés par l'user et répondu par l'api (récupéré par le localStorage)
  const [messages, setMessages] = useState(getMessagesFromLocalStorage());

  // état du chatbot ouvert ou fermé
  const [chatOpen, setChatOpen] = useState(false);

  // Si une demande est en cours, on est à l'état loading
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  // nettoyage de la discussion
  const resetChat = () => {
    setMessages([]);
    localStorage.removeItem("messages");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) return;

    // on stoque les messages dans le local storage et met à jour le front
    const userMessage = [...messages, { role: "user", content }];
    setMessages(userMessage);
    localStorage.setItem("messages", JSON.stringify(userMessage));

    setContent("");
    setIsLoading(true);

    try {
      const data = await fetcher("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      const lastMessage = data.conversation[data.conversation.length - 1];
      const botApiResponse = [
        ...userMessage,
        { role: lastMessage.role, content: lastMessage.content },
      ];

      setMessages(botApiResponse);
      localStorage.setItem("messages", JSON.stringify(botApiResponse));
    } catch (error) {
      console.error("Error:", error);
    }

    setIsLoading(false);
  };

  function renderChatBox() {
    return (
      <div
        className={
          "flex flex-col absolute bottom-28 w-[24rem] h-[35rem] rounded-xl shadow-2xl bg-blue-100 overflow-clip border"
        }
      >
        <div className="flex flex-row p-2 justify-between items-center bg-gray-600">
          <div className="flex flex-row items-center">
            <img
              src={botOpenImg}
              alt="Chatbot"
              className="w-12 h-12 rounded-full shadow-2xl"
            />
            <div className="flex flex-col ml-1">
              <p className="text-white font-bold">BOT</p>
              <span className="font-bold text-sm text-green-500 text-start">
                Online
              </span>
            </div>
          </div>

          <button onClick={resetChat} className="btn group">
            <RefreshCw className="w-5 h-5 group-hover:rotate-90 transition-transform duration-150" />
          </button>
        </div>

        <div className="p-4 h-[30rem] overflow-y-auto overflow-x-hidden">
          {messages.map((message, index) => (
            <div
              className={`chat ${
                message.role === "assistant" ? "chat-start" : "chat-end"
              }`}
              key={index}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  {message.role === "user" ? (
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="Avatar"
                    />
                  ) : (
                    <img src={botOpenImg} alt="Chatbot" />
                  )}
                </div>
              </div>
              <div
                className={classNames("chat-bubble", {
                  "chat-bubble-primary": message.role === "user",
                })}
              >
                {message.content}
              </div>
              <div className="chat-footer opacity-50">lu</div>
            </div>
          ))}

          {isLoading && (
            <span className="loading loading-ring loading-md"></span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 p-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Aa"
            className="flex flex-grow w-3.5 border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 bg-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn btn-primary h-full"
            disabled={isLoading}
          >
            <SendHorizontal className="w-6 h-6" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4">
      <button
        onClick={toggleChat}
        className="w-20 h-20 rounded-full shadow-2xl overflow-clip relative btn btn-circle"
      >
        {chatOpen ? (
          <img src={botCloseImg} alt="Chatbot" className="w-full h-full" />
        ) : (
          <img src={botOpenImg} alt="Chatbot" className="w-full h-full" />
        )}
      </button>

      {chatOpen && renderChatBox()}
    </div>
  );
}
