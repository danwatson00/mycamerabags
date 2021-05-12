import React from 'react';
import ReactDOM from 'react-dom';
import AlertMessage from '../AlertMessage';

export const sendSuccessMessage = (message) => {
  console.log("sendSuccessMessage");
  /* return (
    <AlertMessage
      message={message}
      messageType='success'
    />
  ); */
  ReactDOM.render(
    <AlertMessage
      message={message}
      messageType='success'
    />, document.getElementById('message-center'));
}

export const deepCopy = obj => {
  if (typeof obj !== "object" || obj === null)
    return obj;
  if (obj instanceof Date)
    return new Date(obj.getTime());
  if (obj instanceof Array)
    return obj.reduce((arr, item, i) => {
      arr[i] = deepCopy(item);
      return arr;
    },
      []);
  if (obj instanceof Object)
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = deepCopy(obj[key]);
      return newObj;
    });
}