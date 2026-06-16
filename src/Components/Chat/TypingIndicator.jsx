import React from "react";
import "./TypingIndicator.css";

const TypingIndicator = ({ user }) => {
  return (
    <div className="typing-indicator-wrapper">
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="typing-text">{user} is typing...</span>
    </div>
  );
};

export default TypingIndicator;
