import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
