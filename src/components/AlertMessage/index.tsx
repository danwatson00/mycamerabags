import React, { FC, useState, useEffect } from 'react';
import './AlertMessage.css';

interface AlertMessageProps {
  message: string;
  messageType: string;
  isSuccess?: boolean;
  isWarning?: boolean;
}

const AlertMessage: FC<AlertMessageProps> = (props) => {

  const [alertMessageState, setAlertMessageState] = useState(props);
  useEffect(() => {
    setAlertMessageState(props);
  }, [props]);

/*   function fadeInAlert() {
    const messageContainer = document.getElementById("alert-message-container");
    messageContainer.classList.add("alert-visible");
  }

  function fadeOutAlert() {
    const messageContainer = document.getElementById("alert-message-container");
    messageContainer.classList.remove("alert-visible");
  } */

  function setContainerStyle() {
    let classString = 'message-container';
    if (alertMessageState.messageType === 'warning') {
      /* classString.concat('warning-message'); */
      classString += ' warning-alert'
    } else if (alertMessageState.messageType === 'success') {
      classString += ' success-alert'
    }
    return classString;
  }

  return (
    <div className={setContainerStyle()}>
        <p>{alertMessageState.message}</p>
    </div>
  )
}

export default AlertMessage;