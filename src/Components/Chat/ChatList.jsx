import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConversation,
  setSearchQuery,
  markAsRead,
} from "../../redux/chatSlice";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import "./ChatList.css";

const ChatList = ({ onChatSelect }) => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const selectedConversationId = useSelector(
    (state) => state.chat.selectedConversationId,
  );
  const searchQuery = useSelector((state) => state.chat.searchQuery);

  const filteredConversations = useMemo(() => {
    return conversations.filter(
      (conv) =>
        conv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [conversations, searchQuery]);

  const totalUnread = conversations.reduce(
    (sum, conv) => sum + conv.unreadCount,
    0,
  );

  const handleSelectConversation = (conversationId) => {
    dispatch(selectConversation(conversationId));
    dispatch(markAsRead(conversationId));
    onChatSelect?.();
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h1>Messages</h1>
        <div className="notification-badge">
          <BellOutlined className="bell-icon" />
          {totalUnread > 0 && <span className="badge">{totalUnread}</span>}
        </div>
      </div>

      <div className="search-container">
        <SearchOutlined className="search-icon" />
        <input
          type="text"
          placeholder="Search messages..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="conversations-list">
        {filteredConversations.length === 0 ? (
          <div className="no-conversations">
            <p>No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${
                selectedConversationId === conversation.id ? "active" : ""
              }`}
              onClick={() => handleSelectConversation(conversation.id)}
            >
              <div className="conversation-avatar-wrapper">
                <img
                  src={conversation.userAvatar}
                  alt={conversation.userName}
                  className="conversation-avatar"
                />
                <span className={`online-status ${conversation.status}`}></span>
              </div>

              <div className="conversation-content">
                <div className="conversation-header">
                  <h3 className="conversation-name">{conversation.userName}</h3>
                  <span className="conversation-time">
                    {formatTime(conversation.lastMessageTime)}
                  </span>
                </div>
                <p className="conversation-last-message">
                  {conversation.lastMessage}
                </p>
              </div>

              {conversation.unreadCount > 0 && (
                <div className="unread-badge">{conversation.unreadCount}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default ChatList;
