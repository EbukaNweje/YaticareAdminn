import React, { useRef } from "react";
import {
  FileImageOutlined,
  FileOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./AttachmentMenu.css";

const AttachmentMenu = ({ onFileSelect, onClose }) => {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      // Create file object with type info
      const fileData = {
        file,
        type: fileType,
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      };
      onFileSelect(fileData);
      onClose();
    }
  };

  const attachmentOptions = [
    {
      id: "image",
      label: "Image",
      icon: FileImageOutlined,
      accept: "image/*",
      inputRef: imageInputRef,
      color: "#1890ff",
    },
    {
      id: "file",
      label: "Document",
      icon: FileOutlined,
      accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt",
      inputRef: fileInputRef,
      color: "#52c41a",
    },
    {
      id: "video",
      label: "Video",
      icon: VideoCameraOutlined,
      accept: "video/*",
      inputRef: videoInputRef,
      color: "#fa8c16",
    },
  ];

  return (
    <div className="attachment-menu">
      <div className="attachment-options">
        {attachmentOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.id}
              className="attachment-option"
              onClick={() => option.inputRef.current?.click()}
              title={option.label}
            >
              <div className="option-icon" style={{ color: option.color }}>
                <IconComponent style={{ fontSize: 24 }} />
              </div>
              <span className="option-label">{option.label}</span>
              <input
                ref={option.inputRef}
                type="file"
                accept={option.accept}
                onChange={(e) => handleFileChange(e, option.id)}
                style={{ display: "none" }}
              />
            </button>
          );
        })}
      </div>
      <div className="attachment-menu-overlay" onClick={onClose}></div>
    </div>
  );
};

export default AttachmentMenu;
