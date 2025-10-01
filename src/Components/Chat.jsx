import React, { useEffect, useState, useRef } from "react";
import { createSocketConncetion } from "../utils/socket"; // corrected spelling
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Chat = () => {
    const user = useSelector((store) => store.user);
    const userID = user?._id;
    console.log(userID)
    const { _id } = useParams(); // other user's _id
    console.log("_id from params:", _id);
    const [messages, setMessages] = useState([{ text: "hello world", from: "bot" }]);
    const [newmsg, setNewMsg] = useState("");
    const socketRef = useRef(null);

    const chatPartnerName = (() => {

        for (let i = messages.length - 1; i >= 0; i--) {
            const m = messages[i];
            if (!m.firstName) continue;
            if (m.firstName !== user.firstName) return m.firstName;
        }

        return 'Chat';
    })();
    useEffect(() => {
        if (!userID || !_id) return;


        const socket = createSocketConncetion();
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
            socket.emit("joinchat", {
                firstName: user.firstName,
                userID,
                _id
            });
            console.log("joinChat emitted with:", { userID, _id, firstName: user.firstName });
        });
        socket.on("messageRecived", ({ firstName, text }) => {
            console.log(firstName + " : " + text);
            setMessages(prev => [...prev, { firstName, text, from: firstName === user.firstName ? "me" : "them" }]);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [userID, _id]);


    const sendmessage = () => {
        if (!socketRef.current) return;
        if (!newmsg || !newmsg.trim()) return;

        const payload = {
            firstName: user.firstName,
            userID,
            _id,
            text: newmsg,
        };

        socketRef.current.emit("sendMessage", payload);
        setNewMsg("");
    }

    return (
        <div className="flex flex-col h-screen max-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-white shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                        {chatPartnerName ? chatPartnerName[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800">{chatPartnerName}</h2>
                        <p className="text-xs text-green-500">Online</p>
                    </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">⋮</button>
            </div>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100"
                style={{ paddingBottom: "96px" }}
            >
                {/* Render messages */}
                {messages.map((m, idx) => (
                    <div key={idx} className={m.from === 'me' ? 'flex justify-end' : 'flex items-start gap-2 max-w-[80%]'}>
                        {m.from !== 'me' && (
                            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm">
                                {m.firstName ? m.firstName[0] : 'B'}
                            </div>
                        )}

                        <div className={m.from === 'me' ? 'bg-blue-500 text-white px-4 py-2 rounded-2xl shadow text-sm max-w-[80%]' : 'bg-white px-4 py-2 rounded-2xl shadow text-sm text-gray-800'}>
                            {m.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="fixed left-0 right-0 bottom-0 flex items-center px-4 py-3 border-t  mb-20 shadow-inner">
                <div className="mx-auto w-full max-w-3xl flex items-center gap-3">
                    <input
                        value={newmsg}
                        onChange={(e) => { setNewMsg(e.target.value) }}
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow"

                        onClick={sendmessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
