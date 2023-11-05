import { useState } from 'react';

const Chatbot = () => {

    // message envoyé à l'api
    const [content, setContent] = useState("");

    // chargement des données du localStorage afin de garder les discussions
    const getMessagesFromLocalStorage = () => {
        const messagesFromLocalStorage = localStorage.getItem('messages');
        if(messagesFromLocalStorage){
            return JSON.parse(messagesFromLocalStorage);
        }
        return [];
    }

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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!content) return;

        // on stoque les messages dans le local storage et met à jour le front
        const userMessage = [...messages, { role: "user", content }];
        setMessages(userMessage)
        localStorage.setItem("messages", JSON.stringify(userMessage));

        setContent("");
        setIsLoading(true);

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/chat/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: content }),
            });

            if (response.ok) {
                const data = await response.json();
                const lastMessage = data.conversation[data.conversation.length - 1];
                const botApiResponse = [...userMessage, { role: lastMessage.role, content: lastMessage.content }];

                setMessages(botApiResponse);
                localStorage.setItem("messages", JSON.stringify(botApiResponse));

            } else {
                console.error("Failed to send message.");
            }
        } catch (error) {
            console.error("Error:", error);
        }

        setIsLoading(false);
    };

    return (
        <div className={"fixed bottom-4 left-4"}>
            {!chatOpen ? (
                <img
                    src="/botOpen.png"
                    alt="Chatbot"
                    className={"cursor-pointer w-20 h-20 rounded-full shadow-2xl"}
                    onClick={toggleChat}
                />
            ) : (
                <img
                src="/botClose.png"
                alt="Chatbot"
                className={"cursor-pointer w-20 h-20 rounded-full shadow-2xl"}
                onClick={toggleChat}
                />
            )}

            {chatOpen && (
                <div className={"flex flex-col absolute bottom-28 w-[24rem] h-[35rem] rounded-xl shadow-2xl bg-blue-100"}>

                    <div className="flex flex-row p-2 justify-between items-center bg-gray-600">
                        <div className="flex flex-row items-center">
                            <img
                                src="/botOpen.png"
                                alt="Chatbot"
                                className="w-12 h-12 rounded-full shadow-2xl"
                            />
                            <div className="flex flex-col ml-1">
                                <p className="text-white font-bold">NhiSty Premium</p>
                                <span className="font-bold text-sm text-green-500 text-start">Online</span>
                            </div>
                        </div>

                        <button onClick={resetChat}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 h-[30rem] overflow-y-auto overflow-x-hidden">
                        {messages.map((message, index) => (
                            <div
                                className={`chat ${message.role === 'assistant' ? 'chat-start' : 'chat-end'}`}
                                key={index}
                            >
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        {message.role === 'user' ?
                                            <img src='https://www.w3schools.com/howto/img_avatar.png' alt="Avatar" />
                                            :
                                            <img
                                                src="/botOpen.png"
                                                alt="Chatbot"
                                            />
                                        }

                                    </div>
                                </div>
                                <div className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-primary': ''}`}>{message.content}</div>
                                <div className="chat-footer opacity-50">
                                    lu
                                </div>
                            </div>
                        ))}

                        {
                            isLoading && (
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                            </div>
                        )}
                    </div>


                    <form onSubmit={handleSubmit} className="flex space-x-2">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Aa"
                            className="flex flex-grow w-3.5 border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 focus:outline-none
                                        focus:ring focus:border-blue-300 transform transition-transform hover:scale-90"
                            disabled={isLoading}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
