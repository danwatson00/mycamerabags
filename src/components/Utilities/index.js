import React from 'react';

const sendSuccessMessage = (message) => {
  console.log("sendSuccessMessage");
  return (
    <div className="message">
      <p>{message}</p>
    </div>
  )
}

export { sendSuccessMessage };