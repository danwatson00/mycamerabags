import React from 'react';
import Button from '../Button';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <h1>Welcome to My Camera Bags</h1>
    <h2>Organize Your Camera Gear</h2>
    <Link to={ROUTES.SIGN_UP}>
      <Button label={'Get Started'} click={() => {}} />
    </Link>
    <p>
      Keep track of all your equipment in one place. Organize your gear into 
      multiple 'camera bags' that can be used as checklists for different session 
      types. Create custom checklists for different scenarios with our Camera Bags.
    </p>
  </div>
);

export default Landing;