import React from 'react';

const Alert = ({ message, type = 'error' }) => {
  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Alert;