import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return <span style={{ color: 'red', fontSize: '0.9em' }}>{message}</span>;
};

export default ErrorMessage;
