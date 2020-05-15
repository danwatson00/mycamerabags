import React from 'react';

export const sendSuccessMessage = (message) => {
  console.log("sendSuccessMessage");
  return (
    <div className="message">
      <p>{message}</p>
    </div>
  )
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