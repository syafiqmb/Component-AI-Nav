import React from "react";

const WebsiteAiIcon = ({ iconBgColor, iconColor }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill={iconBgColor} />
      <path
        d="M16.6667 6.6665H7.33333C6.97971 6.6665 6.64057 6.80698 6.39052 7.05703C6.14048 7.30708 6 7.64622 6 7.99984V15.9998C6 16.3535 6.14048 16.6926 6.39052 16.9426C6.64057 17.1927 6.97971 17.3332 7.33333 17.3332H16.6667C17.4 17.3332 18 16.7332 18 15.9998V7.99984C18 7.64622 17.8595 7.30708 17.6095 7.05703C17.3594 6.80698 17.0203 6.6665 16.6667 6.6665V6.6665ZM16.6667 15.9998H7.33333V9.33317H16.6667V15.9998Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default WebsiteAiIcon;
