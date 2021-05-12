import React, { FC, useState, useEffect } from 'react';
import './AccountMenu.css';
import closeButton from '../../images/close-button.svg';
import * as ROUTES from '../../constants/routes';
/* import * as ROLES from '../../constants/roles'; */
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { FirebaseTypes } from '../../constants/types';


interface AccountMenuProps {
  openCloseMenu(): void;
  firebase: FirebaseTypes;
}

const AccountMenu: FC<AccountMenuProps> = (props) => {

  const [accountMenuState, setAccountMenuState] = useState(props); 
  useEffect(() => {
    setAccountMenuState(props);
  }, [props]);

  // No condition
  useEffect(() => {
    /* const body = document.getElementById('app');
    const accountMenu = document.getElementById('account-menu'); */

    /* const closeMenu = () => {
      accountMenuState.openCloseMenu();
    }
    const alertMenu = (e: React.MouseEvent) => {
      alert("account-menu");
      e.stopPropagation(); //this is important! If removed, you'll get both alerts
      return 'click';
    }
    body.addEventListener("click", closeMenu, false);
    accountMenu.addEventListener("click", alertMenu, false); */

    /* body.addEventListener("click", function () {
      alert("wrapper");
    }, false);
    accountMenu.addEventListener("click", function (ev) {
      alert("except");
      ev.stopPropagation(); //this is important! If removed, you'll get both alerts
    }, false); */

    // clean up
   /*  return () => {
      body.removeEventListener("click", closeMenu); 
      accountMenu.removeEventListener("click", alertMenu); 
    } */
  }, []); // empty array => run only once

  function signOut() {
    props.firebase.doSignOut();
  }

  return (
    <div className="menu-container">
      <div id="account-menu">
        <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={accountMenuState.openCloseMenu} />
        <ul>
          <li><Link to={ROUTES.ACCOUNT}>Account</Link></li>
          <li className="clickable" onClick={signOut}>Sign Out</li>
        </ul>
      </div>
    </div>
  );
}

export default withFirebase(AccountMenu);