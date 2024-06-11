import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const ButtonComp: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>
    {label}
  </button>
);
