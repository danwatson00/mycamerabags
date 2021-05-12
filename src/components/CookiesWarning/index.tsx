import React, { FC, useState, useEffect } from 'react';
/* import Button from '../Button';
import CookiesModal from '../CookiesModal'; */
import './CookiesWarning.css';
import closeButton from '../../images/close-button.svg';

interface CookiesWarningProps {
  handleHideWarning(): void;
}

interface CookiesWarningState {
  showCookiesModal: boolean;
}


const CookiesWarning: FC<CookiesWarningProps> = (props) => {

  const [cookiesWarningState, setCookiesWarningState] = useState(props);
  useEffect(() => {
    setCookiesWarningState(props);
  }, [props])
  /* const [showCookiesModal, setShowCookiesModal] = useState(false); */

  return (
    <div id="cookies-warning">
      <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => cookiesWarningState.handleHideWarning()} />
      <h2>We use cookies to improve your experience on our website.</h2>
      <p>
        We use cookies on this website to personalize content, enhance your user experience,
        and track how you interact with us.
      </p>
      {/* <Button class="btn btn-default" name="delete" label="Accept and continue" click={props.handleHideWarning()}/>
      <Button class="btn btn-default" name="delete" label="Manage cookies" click={setShowCookiesModal(true)}/> */}
    </div>
  )
}

export default CookiesWarning;