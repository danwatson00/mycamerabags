import React from 'react';
import * as routes from '../../constants/routes'
import "./Sidebar.css";
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';

const Sidebar = ({ authUser }) => (
    <div>
        <h2 className="logo"><Link to={routes.HOME} >My Camera Bags</Link></h2>
        <ul>
            <li><Link to={routes.ALL_GEAR} className="nav-btn">Browse Gear</Link></li>
            <li><Link to={routes.ALL_BAGS} className="nav-btn">Browse Bags</Link></li>
            {authUser &&
              <div>
                <li><Link to={routes.MY_GEAR} className="nav-btn">My Gear</Link></li>
                <li><Link to={routes.MY_BAGS} className="nav-btn">My Bags</Link></li>
              </div>
            }
        </ul>
    </div>
);

export default withFirebase(Sidebar);