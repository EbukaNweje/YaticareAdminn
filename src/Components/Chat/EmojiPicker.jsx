import React, { useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import "./EmojiPicker.css";

const EmojiPicker = ({ onEmojiSelect, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("smileys");

  const emojiCategories = {
    smileys: {
      label: "😊",
      emojis: [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "🥰",
      ],
    },
    gestures: {
      label: "👋",
      emojis: [
        "👋",
        "🤚",
        "🖐",
        "✋",
        "🖖",
        "👌",
        "🤌",
        "🤏",
        "✌",
        "🤞",
        "🫰",
        "🤟",
        "🤘",
        "🤙",
        "👍",
        "👎",
      ],
    },
    hearts: {
      label: "❤️",
      emojis: [
        "❤️",
        "🧡",
        "💛",
        "💚",
        "💙",
        "💜",
        "🖤",
        "🤍",
        "🤎",
        "💔",
        "💕",
        "💞",
        "💓",
        "💗",
        "💖",
        "💘",
      ],
    },
    flowers: {
      label: "🌹",
      emojis: [
        "🌹",
        "🥀",
        "🌺",
        "🌻",
        "🌼",
        "🌷",
        "🌱",
        "🌲",
        "🌳",
        "🌴",
        "🌵",
        "🌾",
        "🌿",
        "☘️",
        "🍀",
        "🎍",
      ],
    },
    food: {
      label: "🍕",
      emojis: [
        "🍕",
        "🍔",
        "🍟",
        "🌭",
        "🥪",
        "🌮",
        "🌯",
        "🥙",
        "🧆",
        "🍗",
        "🍖",
        "🌞",
        "🍝",
        "🍜",
        "🍲",
        "🥘",
      ],
    },
    activity: {
      label: "⚽",
      emojis: [
        "⚽",
        "🏀",
        "🏈",
        "⚾",
        "🥎",
        "🎾",
        "🏐",
        "🏉",
        "🥏",
        "🎳",
        "🎯",
        "🎱",
        "🎮",
        "🎲",
        "🎰",
        "🎪",
      ],
    },
    travel: {
      label: "✈️",
      emojis: [
        "✈️",
        "🚁",
        "🚂",
        "🚃",
        "🚄",
        "🚅",
        "🚆",
        "🚇",
        "🚈",
        "🚉",
        "🚊",
        "🚝",
        "🚞",
        "🚋",
        "🚌",
        "🚍",
      ],
    },
    objects: {
      label: "💡",
      emojis: [
        "💡",
        "🔦",
        "🏮",
        "📔",
        "📕",
        "📖",
        "📗",
        "📘",
        "📙",
        "📚",
        "📓",
        "📒",
        "📑",
        "🧷",
        "🪡",
        "🧵",
      ],
    },
  };

  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji);
    onClose();
  };

  return (
    <div className="emoji-picker-container">
      <div className="emoji-picker-header">
        <h3>Emoji</h3>
        <button className="emoji-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="emoji-categories">
        {Object.entries(emojiCategories).map(([key, category]) => (
          <button
            key={key}
            className={`category-tab ${selectedCategory === key ? "active" : ""}`}
            onClick={() => setSelectedCategory(key)}
            title={category.label}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="emoji-grid">
        {emojiCategories[selectedCategory].emojis.map((emoji, index) => (
          <button
            key={index}
            className="emoji-item"
            onClick={() => handleEmojiClick(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
