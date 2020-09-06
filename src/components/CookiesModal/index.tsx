import React, { FC } from 'react';
import Button from '../Button';
import closeButton from '../../images/close-button.svg';

interface CookiesModalProps {
  handleHideModal(): void;
}

const CookiesModal: FC<CookiesModalProps> = (props) => {

  function acceptAllCookies() {
    console.log("acceptAll");
  }

  function saveCookiePreferences() {
    console.log("saveCookiePreferences");
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <img className="close-cross" loading="lazy" width="35px" height="35px" src={closeButton} alt="close button" onClick={() => props.handleHideModal()} />
          <h2 className="modal-title">Cookie Preferences</h2>
        </div>
        <div className="modal-body">
          <p>We use cookies to improve our technology and enhance user experience.</p>
          <p>
            Below are some of the types of cookies we use to collect your data. By clicking on 
            'Accept all,' you are giving us consent to perform analytics, provide you with targeted 
            content, and provide you with the means to share content on social media. You’re also 
            giving permission for us to share your data with our partners. You can change your mind 
            at any time and switch the cookies on or off.
          </p>
          <p>Please see our Cookie Policy for more information.</p>
          <div>
            <h3>Strictly Necessary Cookies</h3>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <Button class="btn btn-default close-button" label="Save and close" click={saveCookiePreferences()} />
          <Button class="btn btn-default close-button" label="Accept all" click={acceptAllCookies()} />
        </div>
      </div>
    </div>
  )
}

export default CookiesModal;