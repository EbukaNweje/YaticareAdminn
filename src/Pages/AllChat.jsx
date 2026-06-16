import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import ChatList from "../Components/Chat/ChatList";
import ChatWindow from "../Components/Chat/ChatWindow";
import {
  loadConversations,
  loadConversationMessages,
  receiveMessage,
} from "../redux/chatSlice";
import "./AllChat.css";

const AllChat = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);
  const selectedConversationId = useSelector(
    (state) => state.chat.selectedConversationId,
  );
  const conversations = useSelector((state) => state.chat.conversations);
  const [showMobileChat, setShowMobileChat] = useState(false);

  useEffect(() => {
    dispatch(loadConversations());
  }, [dispatch]);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  );

  const socketRef = useRef(null);
  const selectedConversationIdRef = useRef(selectedConversationId);

  useEffect(() => {
    selectedConversationIdRef.current = selectedConversationId;
  }, [selectedConversationId]);

  useEffect(() => {
    const getSocketUrl = () => {
      const socketUrl = import.meta.env.VITE_CHAT_SOCKET_URL;
      if (socketUrl) {
        return socketUrl;
      }

      const apiBase =
        import.meta.env.VITE_CHAT_API_BASE_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        window.location.origin;

      try {
        const url = new URL(apiBase);
        return `${url.protocol}//${url.host}`;
      } catch {
        return apiBase.split("/api")[0] || apiBase;
      }
    };

    const socketUrl = getSocketUrl();
    const socket = io(socketUrl, {
      path: "/socket.io",
      transports: ["websocket"],
      autoConnect: true,
    });

    socketRef.current = socket;

    const handleIncomingMessage = (payload) => {
      const eventPayload = payload?.data || payload?.payload || payload;
      if (!eventPayload) return;

      dispatch(receiveMessage(eventPayload));

      const eventConversationId =
        eventPayload.conversationId ||
        eventPayload.data?.conversationId ||
        eventPayload.conversation?._id ||
        eventPayload.conversation?.id ||
        eventPayload.message?.conversationId ||
        eventPayload.message?.conversation_id;

      if (
        eventConversationId &&
        eventConversationId === selectedConversationIdRef.current
      ) {
        dispatch(loadConversationMessages(selectedConversationIdRef.current));
      }
    };

    socket.on("connect", () => {});
    socket.on("disconnect", () => {});
    socket.on("message", handleIncomingMessage);
    socket.on("newMessage", handleIncomingMessage);
    socket.on("chatMessage", handleIncomingMessage);
    socket.on("userMessage", handleIncomingMessage);
    socket.on("new_message", handleIncomingMessage);
    socket.on("incomingMessage", handleIncomingMessage);
    socket.onAny((event, payload) => {
      if (
        [
          "message",
          "newMessage",
          "chatMessage",
          "userMessage",
          "new_message",
          "incomingMessage",
        ].includes(event)
      ) {
        handleIncomingMessage(payload);
      }
    });

    socket.on("connect_error", () => {});

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !selectedConversationId) {
      return;
    }

    socket.emit("joinConversation", selectedConversationId);
    socket.emit("joinRoom", selectedConversationId);
    socket.emit("join", selectedConversationId);

    return () => {
      socket.emit("leaveConversation", selectedConversationId);
      socket.emit("leaveRoom", selectedConversationId);
      socket.emit("leave", selectedConversationId);
    };
  }, [selectedConversationId]);

  if (loading && conversations.length === 0) {
    return (
      <div className="all-chat-container">
        <div className="no-chat-selected">
          <p>Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (error && conversations.length === 0) {
    return (
      <div className="all-chat-container">
        <div className="no-chat-selected">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-chat-container">
      <div className="chat-layout">
        {/* Chat List */}
        <div
          className={`chat-list-section ${showMobileChat ? "hidden-mobile" : ""}`}
        >
          <ChatList onChatSelect={() => setShowMobileChat(true)} />
        </div>

        {/* Chat Window */}
        <div
          className={`chat-window-section ${showMobileChat ? "show-mobile" : ""}`}
        >
          {selectedConversation ? (
            <>
              <div className="chat-window-header">
                <button
                  className="mobile-back-button"
                  onClick={() => setShowMobileChat(false)}
                >
                  ← Back
                </button>
                <div className="user-info-header">
                  <img
                    src={selectedConversation.userAvatar}
                    alt={selectedConversation.userName}
                    className="header-avatar"
                  />
                  <div>
                    <h2 className="header-username">
                      {selectedConversation.userName}
                    </h2>
                    <span
                      className={`status-indicator ${selectedConversation.status}`}
                    >
                      {selectedConversation.status}
                    </span>
                  </div>
                </div>
              </div>
              <ChatWindow conversation={selectedConversation} />
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllChat;
