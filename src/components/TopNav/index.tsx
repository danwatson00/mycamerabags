import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import './TopNav.css';
import userIcon from '../../images/user-icon.png';
import AccountMenu from '../AccountMenu';
import Button from '../Button';

const TopNav = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <TopNavAuth authUser={authUser} />
      ) : (
        <TopNavNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const TopNavAuth = ({ authUser }: any) => {
  
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);

  function openCloseMenu() {
    setAccountMenuVisible(!accountMenuVisible);
  }

  return (
    <div id="top-nav"className="top-nav-ul">
      <ul>
        <li>
          <img src={authUser.photoURL ? authUser.photoURL : userIcon} alt="user profile" className="profile-pic clickable" onClick={openCloseMenu}></img>
        </li>
        {authUser.roles.includes(ROLES.ADMIN) && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
      </ul>
      {accountMenuVisible &&
          <AccountMenu
            openCloseMenu={() => openCloseMenu()}
          />
      }
    </div>
  );
} 

const TopNavNonAuth = () => (
  <ul className="top-nav-ul">
    <li><Link to={ROUTES.LANDING}>Landing</Link></li>
    <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>
    <li><Link to={ROUTES.SIGN_UP}><Button label="Sign Up" /></Link></li>
  </ul>
);

export default TopNav;