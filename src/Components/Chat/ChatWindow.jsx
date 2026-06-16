import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  setTypingUser,
  loadConversationMessages,
} from "../../redux/chatSlice";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import AttachmentMenu from "./AttachmentMenu";
import EmojiPicker from "./EmojiPicker";
import { SendOutlined, PlusOutlined, SmileOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import "./ChatWindow.css";

const ChatWindow = ({ conversation }) => {
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const typingUsers = useSelector((state) => state.chat.typingUsers);
  const isUserTyping = typingUsers[conversation.id];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  useEffect(() => {
    if (conversation?.id) {
      dispatch(loadConversationMessages(conversation.id));
    }
  }, [conversation?.id, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessageInput(value);

    // Simulate typing indicator
    if (!isTyping) {
      setIsTyping(true);
      dispatch(
        setTypingUser({
          conversationId: conversation.id,
          userId: "admin",
          isTyping: true,
        }),
      );
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      dispatch(
        setTypingUser({
          conversationId: conversation.id,
          userId: "admin",
          isTyping: false,
        }),
      );
    }, 1000);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() && !selectedFile) {
      return;
    }

    try {
      await dispatch(
        sendMessage({
          conversationId: conversation.id,
          message: messageInput.trim(),
          fileData: selectedFile,
        }),
      ).unwrap();

      setMessageInput("");
      setSelectedFile(null);
      setShowAttachmentMenu(false);
      setShowEmojiPicker(false);
      setIsTyping(false);
    } catch (error) {
      toast.error(error || "Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (fileData) => {
    setSelectedFile(fileData);
  };

  const handleEmojiSelect = (emoji) => {
    setMessageInput((prev) => prev + emoji);
  };

  return (
    <div className="chat-window">
      <div className="messages-container">
        {conversation.messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            conversation={conversation}
            isFromAdmin={message.senderId === "admin"}
          />
        ))}

        {isUserTyping && (
          <div className="typing-bubble-wrapper">
            <TypingIndicator user="Admin" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {selectedFile && (
        <div className="file-preview">
          <div className="file-preview-content">
            {selectedFile.type === "image" && (
              <img
                src={selectedFile.url}
                alt="preview"
                className="file-preview-image"
              />
            )}
            {selectedFile.type === "video" && (
              <video
                src={selectedFile.url}
                className="file-preview-video"
                controls
              />
            )}
            {selectedFile.type === "file" && (
              <div className="file-preview-document">
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <p className="file-name">{selectedFile.name}</p>
                  <p className="file-size">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            )}
          </div>
          <button
            className="file-remove-btn"
            onClick={() => setSelectedFile(null)}
            title="Remove file"
          >
            ✕
          </button>
        </div>
      )}

      <div className="message-input-container">
        <button
          className="attach-button"
          onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
          title="Attach file"
        >
          <PlusOutlined />
        </button>

        {showAttachmentMenu && (
          <AttachmentMenu
            onFileSelect={handleFileSelect}
            onClose={() => setShowAttachmentMenu(false)}
          />
        )}

        <textarea
          className="message-input"
          placeholder="Type a message..."
          value={messageInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          rows="1"
        />

        <button
          className="emoji-button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          title="Add emoji"
        >
          <SmileOutlined />
        </button>

        {showEmojiPicker && (
          <EmojiPicker
            onEmojiSelect={handleEmojiSelect}
            onClose={() => setShowEmojiPicker(false)}
          />
        )}

        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={!messageInput.trim() && !selectedFile}
          title="Send message"
        >
          <SendOutlined />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
