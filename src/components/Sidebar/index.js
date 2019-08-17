import React from 'react';
import * as routes from '../../constants/routes'
import "./Sidebar.css";
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';

const Sidebar = () => (
  <div>
      <ul>
          <li><Link to={routes.ALL_GEAR} className="nav-btn">Browse Gear</Link></li>
          <li><Link to={routes.ALL_BAGS} className="nav-btn">Browse Bags</Link></li>
          <li><Link to={routes.MY_GEAR} className="nav-btn">My Gear</Link></li>
          <li><Link to={routes.MY_BAGS} className="nav-btn">My Bags</Link></li>
      </ul>
  </div>
);

export default withFirebase(Sidebar);