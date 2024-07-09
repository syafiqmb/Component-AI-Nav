import { useTheme } from "@chakra-ui/react";
import React from "react";

const NewsIcon = () => {
  const theme = useTheme.call();

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill={theme.colors?.iconBgColor} />
      <path
        d="M17.25 6H6.75001C5.96868 6 5.33334 6.598 5.33334 7.33333V16.6667C5.33334 17.402 5.96868 18 6.75001 18H17.25C18.0313 18 18.6667 17.402 18.6667 16.6667V7.33333C18.6667 6.598 18.0313 6 17.25 6ZM17.25 16.6667H6.75001C6.71201 16.6667 6.68601 16.656 6.67468 16.656C6.67001 16.656 6.66734 16.6573 6.66668 16.6613L6.65868 7.364C6.66334 7.35733 6.69334 7.33333 6.75001 7.33333H17.25C17.3027 7.334 17.3313 7.352 17.3333 7.33867L17.3413 16.636C17.3367 16.6427 17.3067 16.6667 17.25 16.6667Z"
        fill={theme.colors?.iconColor}
      />
      <path
        d="M8 8.6665H12V12.6665H8V8.6665ZM12.6667 13.9998H8V15.3332H16V13.9998H13.3333H12.6667ZM13.3333 11.3332H16V12.6665H13.3333V11.3332ZM13.3333 8.6665H16V9.99984H13.3333V8.6665Z"
        fill={theme.colors?.iconColor}
      />
    </svg>
  );
};

export default NewsIcon;
