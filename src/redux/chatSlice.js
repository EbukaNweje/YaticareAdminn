import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_CHAT_API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "https://yaticare-backend.onrender.com/api/chat";

const api = axios.create({
  baseURL: API_BASE,
});

const buildAvatarUrl = (seed) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed || "User")}`;

const getAdminIdentity = (getState) => {
  if (typeof window === "undefined") {
    return { email: "", name: "Admin" };
  }

  try {
    const state = getState ? getState() : null;
    const adminData = state?.admin?.data;
    if (adminData) {
      return {
        email: adminData.email || adminData.adminEmail || "",
        name:
          adminData.fullName || adminData.name || adminData.userName || "Admin",
      };
    }
    return { email: "", name: "Admin" };
  } catch {
    return { email: "", name: "Admin" };
  }
};

const normalizeMessage = (message, conversationId) => {
  const senderRole =
    message?.senderRole || (message?.senderId === "admin" ? "admin" : "user");
  const fileUrl = message?.fileUrl || null;

  return {
    id:
      message?._id ||
      message?.id ||
      `${conversationId}-${message?.createdAt || Date.now()}`,
    senderId: message?.senderId || senderRole,
    senderRole,
    senderName:
      message?.senderName ||
      message?.userName ||
      message?.senderEmail ||
      "Unknown",
    senderEmail: message?.senderEmail || null,
    content: message?.message ?? message?.content ?? "",
    timestamp:
      message?.createdAt || message?.timestamp || new Date().toISOString(),
    reactions: message?.reactions || {},
    isFile: Boolean(fileUrl),
    fileUrl,
    fileName: message?.fileName || null,
    fileType: message?.fileType || (fileUrl ? "file" : null),
    fileSize: message?.fileSize || null,
    readByUserAt: message?.readByUserAt || null,
    readByAdminAt: message?.readByAdminAt || null,
  };
};

const normalizeConversation = (conversation) => {
  const userEmail =
    conversation?.userEmail ||
    conversation?.email ||
    conversation?.user?.email ||
    conversation?.senderEmail ||
    "";
  const userName =
    conversation?.userName ||
    conversation?.user?.userName ||
    conversation?.user?.fullName ||
    userEmail ||
    "Unknown User";

  return {
    id: conversation?._id || conversation?.id,
    userId:
      conversation?.userId || conversation?.user?._id || userEmail || userName,
    userName,
    userEmail,
    userAvatar:
      conversation?.userAvatar ||
      conversation?.avatar ||
      buildAvatarUrl(userEmail || userName),
    lastMessage: conversation?.lastMessage || "",
    lastMessageTime:
      conversation?.lastMessageAt ||
      conversation?.updatedAt ||
      new Date().toISOString(),
    unreadCount: conversation?.unreadByAdmin || 0,
    status: conversation?.status || "open",
    lastSenderRole: conversation?.lastSenderRole || "user",
    messages: Array.isArray(conversation?.messages)
      ? conversation.messages.map((message) =>
          normalizeMessage(message, conversation?._id || conversation?.id),
        )
      : [],
  };
};

const upsertConversation = (state, conversation) => {
  const normalizedConversation = normalizeConversation(conversation);
  const existingIndex = state.conversations.findIndex(
    (item) => String(item.id) === String(normalizedConversation.id),
  );

  if (existingIndex >= 0) {
    state.conversations[existingIndex] = {
      ...state.conversations[existingIndex],
      ...normalizedConversation,
      messages:
        normalizedConversation.messages.length > 0
          ? normalizedConversation.messages
          : state.conversations[existingIndex].messages || [],
    };
    return state.conversations[existingIndex];
  }

  state.conversations.unshift(normalizedConversation);
  return normalizedConversation;
};

export const loadConversations = createAsyncThunk(
  "chat/loadConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/conversations");
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load conversations",
      );
    }
  },
);

export const loadConversationMessages = createAsyncThunk(
  "chat/loadConversationMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/conversations/${conversationId}/messages`,
      );
      return response.data?.data || { conversation: null, messages: [] };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load conversation messages",
      );
    }
  },
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { conversationId, message, fileData },
    { rejectWithValue, getState },
  ) => {
    try {
      const { email, name } = getAdminIdentity(getState);

      if (!email) {
        return rejectWithValue("Admin email is missing. Please log in again.");
      }

      const payload = {
        conversationId,
        senderRole: "admin",
        senderEmail: email,
        senderName: name,
        message: String(message || fileData?.name || "").trim(),
      };

      const response = await api.post("/messages", payload);

      return {
        conversation: response.data?.data?.conversation,
        message: response.data?.data?.message,
        fileData,
        conversationId,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to send message",
      );
    }
  },
);

export const markAsRead = createAsyncThunk(
  "chat/markAsRead",
  async (conversationId, { rejectWithValue }) => {
    try {
      await api.patch(`/conversations/${conversationId}/read`, {
        role: "admin",
      });

      return conversationId;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to mark conversation as read",
      );
    }
  },
);

const initialState = {
  conversations: [],
  selectedConversationId: null,
  typingUsers: {},
  searchQuery: "",
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectConversation: (state, action) => {
      state.selectedConversationId = action.payload;
    },
    addReaction: (state, action) => {
      const { conversationId, messageId, emoji } = action.payload;
      const conversation = state.conversations.find(
        (item) => String(item.id) === String(conversationId),
      );

      if (conversation) {
        const message = conversation.messages.find(
          (item) => String(item.id) === String(messageId),
        );
        if (message) {
          if (!message.reactions[emoji]) {
            message.reactions[emoji] = 0;
          }
          message.reactions[emoji] += 1;
        }
      }
    },
    removeReaction: (state, action) => {
      const { conversationId, messageId, emoji } = action.payload;
      const conversation = state.conversations.find(
        (item) => String(item.id) === String(conversationId),
      );

      if (conversation) {
        const message = conversation.messages.find(
          (item) => String(item.id) === String(messageId),
        );
        if (message && message.reactions[emoji]) {
          message.reactions[emoji] -= 1;
          if (message.reactions[emoji] === 0) {
            delete message.reactions[emoji];
          }
        }
      }
    },
    setTypingUser: (state, action) => {
      const { conversationId, userId, isTyping } = action.payload;
      if (isTyping) {
        state.typingUsers[conversationId] = userId;
      } else {
        delete state.typingUsers[conversationId];
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    receiveMessage: (state, action) => {
      const payload = action.payload || {};
      const messagePayload =
        payload.message ||
        payload.data?.message ||
        payload.payload?.message ||
        payload;
      const conversationPayload =
        payload.conversation ||
        payload.data?.conversation ||
        payload.conversation;
      const targetConversationId =
        conversationPayload?.id ||
        conversationPayload?._id ||
        payload.conversationId ||
        payload.data?.conversationId ||
        payload.conversation_id ||
        payload?.conversation?.id ||
        payload?.message?.conversationId ||
        payload?.message?.conversation_id;

      let conversation = state.conversations.find(
        (item) => String(item.id) === String(targetConversationId),
      );

      if (conversationPayload) {
        const normalizedConversation =
          normalizeConversation(conversationPayload);
        conversation = upsertConversation(state, normalizedConversation);
      }

      if (!conversation || !messagePayload) {
        return;
      }

      const normalizedMessage = normalizeMessage(
        messagePayload,
        conversation.id,
      );
      conversation.messages.push(normalizedMessage);
      conversation.lastMessage = normalizedMessage.content;
      conversation.lastMessageTime = normalizedMessage.timestamp;
      if (String(state.selectedConversationId) !== String(conversation.id)) {
        conversation.unreadCount += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = Array.isArray(action.payload)
          ? action.payload.map((conversation) =>
              normalizeConversation(conversation),
            )
          : [];

        if (
          !state.selectedConversationId ||
          !state.conversations.some(
            (conversation) =>
              String(conversation.id) === String(state.selectedConversationId),
          )
        ) {
          state.selectedConversationId = state.conversations[0]?.id || null;
        }
      })
      .addCase(loadConversations.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to load conversations";
      })
      .addCase(loadConversationMessages.fulfilled, (state, action) => {
        const conversation = action.payload?.conversation;
        const messages = action.payload?.messages || [];

        if (conversation) {
          const normalizedConversation = normalizeConversation(conversation);
          normalizedConversation.messages = messages.map((message) =>
            normalizeMessage(message, normalizedConversation.id),
          );

          const updatedConversation = upsertConversation(
            state,
            normalizedConversation,
          );

          if (
            String(state.selectedConversationId) ===
            String(updatedConversation.id)
          ) {
            updatedConversation.unreadCount = 0;
          }
        }
      })
      .addCase(loadConversationMessages.rejected, (state, action) => {
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to load conversation messages";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { conversation, message, fileData, conversationId } =
          action.payload;
        const targetConversationId =
          conversation?.id || conversation?._id || conversationId;

        if (!message) {
          return;
        }

        let existingConversation = null;

        if (conversation) {
          const normalizedConversation = normalizeConversation(conversation);
          normalizedConversation.messages = Array.isArray(conversation.messages)
            ? conversation.messages.map((msg) =>
                normalizeMessage(msg, normalizedConversation.id),
              )
            : [];
          existingConversation = upsertConversation(
            state,
            normalizedConversation,
          );
        } else if (targetConversationId) {
          existingConversation = state.conversations.find(
            (item) => String(item.id) === String(targetConversationId),
          );
        }

        const normalizedMessage = normalizeMessage(
          message,
          targetConversationId,
        );

        if (fileData) {
          normalizedMessage.isFile = true;
          normalizedMessage.fileUrl = fileData.url || normalizedMessage.fileUrl;
          normalizedMessage.fileName =
            fileData.name || normalizedMessage.fileName;
          normalizedMessage.fileType =
            fileData.type || normalizedMessage.fileType;
          normalizedMessage.fileSize =
            fileData.size || normalizedMessage.fileSize;
        }

        if (existingConversation) {
          const messageExists = existingConversation.messages.some(
            (item) => String(item.id) === String(normalizedMessage.id),
          );

          if (!messageExists) {
            existingConversation.messages.push(normalizedMessage);
          }
          existingConversation.lastMessage =
            (conversation && conversation.lastMessage) ||
            normalizedMessage.content;
          existingConversation.lastMessageTime =
            (conversation && conversation.lastMessageTime) ||
            normalizedMessage.timestamp;
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error =
          action.payload || action.error.message || "Failed to send message";
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const conversation = state.conversations.find(
          (item) => String(item.id) === String(action.payload),
        );

        if (conversation) {
          conversation.unreadCount = 0;
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to mark conversation as read";
      });
  },
});

export const {
  selectConversation,
  addReaction,
  removeReaction,
  setTypingUser,
  setSearchQuery,
  receiveMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
