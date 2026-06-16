# Admin Chat System Documentation

## Overview

This is a comprehensive one-on-one chat system for your Yaticare Admin Dashboard with the following features:

- Real-time messaging (simulated with mock data)
- User/conversation list with search functionality
- Message history
- **File Sharing** - Upload images, videos, and documents
- **Emoji Picker** - 8 emoji categories with 128+ emojis
- Typing indicators
- Message reactions and emoji
- Notifications for unread messages
- Responsive mobile design

## Project Structure

```
src/
├── redux/
│   ├── store.js                    # Redux store configuration with persistence
│   └── chatSlice.js                # Chat state management
├── Pages/
│   ├── AllChat.jsx                 # Main chat page component
│   └── AllChat.css                 # Main chat styling
├── Components/
│   └── Chat/
│       ├── ChatList.jsx            # Conversation list with search
│       ├── ChatList.css
│       ├── ChatWindow.jsx          # Main message display and input
│       ├── ChatWindow.css
│       ├── MessageBubble.jsx       # Individual message component
│       ├── MessageBubble.css
│       ├── TypingIndicator.jsx     # Typing animation
│       ├── TypingIndicator.css
│       ├── AttachmentMenu.jsx      # File upload menu (NEW)
│       ├── AttachmentMenu.css
│       ├── EmojiPicker.jsx         # Emoji selector (NEW)
│       └── EmojiPicker.css
└── utils/
    └── chatUtils.js                # Utility functions
```

## Features

### 1. **Conversation Management**

- View list of all conversations with users
- Search conversations by username or message content
- Display unread message count
- Show user online/offline status
- Display last message preview and timestamp

### 2. **Real-Time Messaging**

- Send and receive messages
- Auto-scroll to latest message
- Message timestamps
- Automatic responses (simulated for demo)

### 3. **Typing Indicators**

- Show when you're typing
- Show when the other user is typing
- Animated dots animation

### 4. **File Sharing**

- **Upload Images** - Displays inline in chat with preview
  - Supported formats: jpg, jpeg, png, gif, webp, etc.
  - Max display: 300px height
- **Upload Videos** - Playable video player with controls
  - Supported formats: mp4, webm, ogg, etc.
  - Max display: 300px height
- **Upload Documents** - Shows download link with file info
  - Supported formats: pdf, doc, docx, xls, xlsx, ppt, pptx, txt
  - Display file name and size
- File preview before sending (can remove if needed)
- Admin can reply to users with files

### 5. **Emoji Picker**

- **8 Emoji Categories:**
  - 😊 Smileys & Emotions (16 emojis)
  - 👋 Gestures (16 emojis)
  - ❤️ Hearts & Love (16 emojis)
  - 🌹 Flowers & Nature (16 emojis)
  - 🍕 Food & Drink (16 emojis)
  - ⚽ Activity & Sports (16 emojis)
  - ✈️ Travel & Places (16 emojis)
  - 💡 Objects (16 emojis)
- Click the emoji button (😊) in the chat input to open picker
- Click any emoji to insert into message
- Close picker after selection
- Fully responsive on mobile

### 6. **Message Reactions**

- Add emoji reactions to messages (👍, ❤️, 😂, 😮, 😢, 🔥, ✨, 🎉)
- Remove reactions
- Display reaction counts on messages

### 7. **Search Functionality**

- Search by user name
- Search by message content
- Real-time filtering

### 8. **Notifications**

- Unread badge on conversations
- Bell icon with unread count
- Mark as read when conversation is opened

### 9. **Responsive Design**

- Desktop layout (list + chat window side by side)
- Mobile layout (toggle between list and chat)
- Touch-friendly buttons and inputs

## Redux State Structure

```javascript
{
  chat: {
    conversations: [
      {
        id: 1,
        userId: 101,
        userName: "John Doe",
        userAvatar: "url",
        lastMessage: "...",
        lastMessageTime: "2024-06-08T10:30:00",
        unreadCount: 2,
        status: "online" | "offline",
        messages: [
          {
            id: 1,
            senderId: 101 | "admin",
            senderName: "...",
            content: "...",
            timestamp: "...",
            reactions: { "👍": 1, "❤️": 2 },
            isFile: false,
            fileUrl: null,
            fileName: null,
            fileType: null,              // "image" | "video" | "file"
            fileSize: null,
          }
        ]
      }
    ],
    selectedConversationId: 1,
    typingUsers: {},
    searchQuery: "",
    loading: false,
    error: null,
  }
}
```

## Redux Actions

```javascript
// Select a conversation
dispatch(selectConversation(conversationId));

// Send a message
dispatch(sendMessage({ conversationId, message: "text" }));

// Add reaction
dispatch(addReaction({ conversationId, messageId, emoji: "👍" }));

// Remove reaction
dispatch(removeReaction({ conversationId, messageId, emoji: "👍" }));

// Set typing indicator
dispatch(setTypingUser({ conversationId, userId, isTyping: true }));

// Search
dispatch(setSearchQuery("search text"));

// Mark as read
dispatch(markAsRead(conversationId));

// Receive message
dispatch(receiveMessage({ conversationId, message }));
```

## Backend Integration Steps

### 1. **Replace Mock Data**

Update `src/redux/chatSlice.js` - Replace `mockConversations` with API calls:

```javascript
// Example: Fetch conversations from API
import axios from "axios";

const fetchConversations = async () => {
  const response = await axios.get("/api/admin/conversations");
  return response.data;
};
```

### 2. **API Endpoints Required**

```
GET    /api/admin/conversations        - Get all conversations
GET    /api/admin/conversations/{id}   - Get specific conversation
POST   /api/admin/messages            - Send message
POST   /api/admin/reactions           - Add reaction
DELETE /api/admin/reactions           - Remove reaction
PUT    /api/admin/conversations/{id}/read - Mark as read
WebSocket: ws://api.example.com/chat  - Real-time messaging
```

### 3. **Message Sending**

Create async thunk in Redux:

```javascript
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessageAsync = createAsyncThunk(
  "chat/sendMessage",
  async ({ conversationId, message }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/messages", {
        conversationId,
        content: message,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
```

### 4. **Real-Time Messaging with WebSocket**

Replace the simulated response:

```javascript
import io from "socket.io-client";

const socket = io("ws://your-api-url");

socket.on("message", (data) => {
  dispatch(
    receiveMessage({
      conversationId: data.conversationId,
      message: data.message,
    }),
  );
});
```

### 5. **File Upload**

The file upload is now fully integrated! Files are stored locally using `URL.createObjectURL()` for demo purposes.

For production backend integration in `AttachmentMenu.jsx`:

```javascript
const handleFileChange = async (event, fileType) => {
  const file = event.target.files[0];
  if (file) {
    // Upload to backend
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileType);

    try {
      const response = await axios.post("/api/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileData = {
        file,
        type: fileType,
        url: response.data.fileUrl, // Backend URL
        name: response.data.fileName,
        size: response.data.fileSize,
      };

      onFileSelect(fileData);
    } catch (error) {
      console.error("File upload failed:", error);
    }
  }
};
```

## Usage

### Basic Setup

The chat system is already integrated into your app. Just navigate to the Chat page and it will work with mock data.

### Customization

**Change avatar source:**
In `ChatList.jsx` and `MessageBubble.jsx`, replace the DiceBear API URL:

```javascript
// Current
userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John";

// Use your own API or image URLs
userAvatar: `${API_BASE_URL}/users/${userId}/avatar`;
```

**Customize emoji reactions:**
In `MessageBubble.jsx`:

```javascript
const emojis = ["👍", "❤️", "😂", "😮", "😢", "🔥", "✨", "🎉"];
// Add or remove emojis as needed
```

**Customize Emoji Picker categories:**
In `EmojiPicker.jsx`, modify the `emojiCategories` object:

```javascript
const emojiCategories = {
  smileys: {
    label: "😊",
    emojis: ["😀", "😃", "😄", "😁" /* ... */],
  },
  // Add more or modify existing categories
};
```

**Customize File Upload Options:**
In `AttachmentMenu.jsx`, modify the `attachmentOptions` array:

```javascript
const attachmentOptions = [
  {
    id: "image",
    label: "Image",
    icon: FileImageOutlined,
    accept: "image/*",
    color: "#1890ff",
  },
  // Modify accept attribute to change supported file types
];
```

**Change styling:**
Modify the CSS files:

- `AllChat.css` - Main layout
- `ChatList.css` - Conversation list
- `ChatWindow.css` - Message input area & file preview
- `MessageBubble.css` - Message styling & media display
- `TypingIndicator.css` - Typing animation
- `AttachmentMenu.css` - File upload menu
- `EmojiPicker.css` - Emoji picker styling

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ⚠️ Requires polyfills

## Performance Considerations

- Messages are loaded with conversations (currently all at once)
- Consider pagination for large conversations
- Message virtualization for thousands of messages
- Lazy load avatars with intersection observer

## Known Limitations (Current Demo)

- Responses are auto-generated (not real)
- Files are stored locally using `URL.createObjectURL()` (demo only)
- No encryption for messages
- No message editing/deletion
- No message search in history
- No video/audio calls

## Next Steps

1. Set up backend API endpoints
2. Replace mock data with actual API calls
3. Implement WebSocket for real-time updates
4. **✅ File upload functionality (already implemented)**
5. Implement message encryption
6. Add admin notification settings
7. Add conversation archiving/deletion
8. Add user blocking features

## Troubleshooting

**Messages not appearing:**

- Check Redux DevTools to verify state updates
- Ensure Redux Provider is wrapping the app in main.jsx
- Check browser console for errors

**Styling issues:**

- Verify CSS files are imported
- Check Tailwind CSS configuration
- Ensure no conflicting CSS from other components

**Performance issues:**

- Implement message pagination
- Use React.memo for MessageBubble component
- Implement virtual scrolling for large message lists

## Support

For issues or questions about implementation, refer to:

- Redux documentation: https://redux.js.org/
- Redux Toolkit: https://redux-toolkit.js.org/
- Ant Design Icons: https://ant.design/components/icon/
