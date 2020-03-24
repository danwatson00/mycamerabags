import React from 'react';
import Button from '../Button';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <h1>Welcome to My Camera Bags</h1>
    <h2>Tools to Help You Organize Your Camera Gear</h2>
    <Link to={ROUTES.SIGN_UP}>
      <Button label={'Get Started'} />
    </Link>
    <h2>Keep track of all your equipment in one place.</h2>
    <h2>Organize your gear into multiple 'camera bags' that can be used as checklists for different session types.</h2>
    <h2>Create custom checklists for different scenarios with our Camera Bags.</h2>
  </div>
);

export default Landing;