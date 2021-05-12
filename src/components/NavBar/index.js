import React from 'react';
import * as routes from '../../constants/routes'
import "./NavBar.css";
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';

const NavBar = ({ authUser }) => (
  <ul id="nav-bar">
      <li><Link to={routes.ALL_GEAR} className="nav-btn">Browse Gear</Link></li>
      <li><Link to={routes.ALL_BAGS} className="nav-btn">Browse Bags</Link></li>
      {authUser && <li><Link to={routes.MY_GEAR} className="nav-btn">My Gear</Link></li>}
      {authUser && <li><Link to={routes.MY_BAGS} className="nav-btn">My Bags</Link></li>}
  </ul>
);

export default withFirebase(NavBar);