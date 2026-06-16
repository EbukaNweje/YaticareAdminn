import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReaction, removeReaction } from "../../redux/chatSlice";
import { SmileOutlined } from "@ant-design/icons";
import "./MessageBubble.css";

const MessageBubble = ({ message, conversation, isFromAdmin }) => {
  const dispatch = useDispatch();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const isAdminMessage =
    isFromAdmin ||
    message.senderRole === "admin" ||
    message.senderId === "admin";

  const emojis = ["👍", "❤️", "😂", "😮", "😢", "🔥", "✨", "🎉"];

  const handleAddReaction = (emoji) => {
    dispatch(
      addReaction({
        conversationId: conversation.id,
        messageId: message.id,
        emoji,
      }),
    );
    setShowEmojiPicker(false);
  };

  const handleRemoveReaction = (emoji) => {
    dispatch(
      removeReaction({
        conversationId: conversation.id,
        messageId: message.id,
        emoji,
      }),
    );
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`message-bubble-wrapper ${isAdminMessage ? "admin" : "user"}`}
    >
      {!isAdminMessage && (
        <img
          src={conversation.userAvatar}
          alt={message.senderName}
          className="message-avatar"
        />
      )}

      <div
        className={`message-bubble ${isAdminMessage ? "admin-message" : "user-message"}`}
      >
        {message.isFile && (
          <div className="message-file-container">
            {message.fileType === "image" && (
              <img
                src={message.fileUrl}
                alt={message.fileName}
                className="message-file-image"
              />
            )}
            {message.fileType === "video" && (
              <video
                src={message.fileUrl}
                className="message-file-video"
                controls
              />
            )}
            {message.fileType === "file" && (
              <a
                href={message.fileUrl}
                download={message.fileName}
                className="message-file-link"
              >
                <div className="file-icon">📄</div>
                <div className="file-details">
                  <p className="file-name">{message.fileName}</p>
                  <p className="file-size">
                    {(message.fileSize / 1024).toFixed(2)} KB
                  </p>
                </div>
              </a>
            )}
          </div>
        )}

        {message.content && (
          <div className="message-content">{message.content}</div>
        )}

        <div className="message-footer">
          <span className="message-time">
            {formatMessageTime(message.timestamp)}
          </span>
        </div>

        {/* Message Reactions */}
        {Object.keys(message.reactions).length > 0 && (
          <div className="message-reactions">
            {Object.entries(message.reactions).map(([emoji, count]) => (
              <button
                key={emoji}
                className="reaction-button"
                onClick={() => handleRemoveReaction(emoji)}
                title="Click to remove reaction"
              >
                {emoji} {count > 1 ? count : ""}
              </button>
            ))}
          </div>
        )}

        {/* Emoji Picker */}
        <div className="emoji-picker-wrapper">
          <button
            className="emoji-picker-button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Add reaction"
          >
            <SmileOutlined />
          </button>

          {showEmojiPicker && (
            <div className="emoji-picker">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  className="emoji-option"
                  onClick={() => handleAddReaction(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
