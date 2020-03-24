import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Sidebar from '../Sidebar';
import AllGear from '../AllGear';
import MyGear from '../MyGear';
import MyBags from '../MyBags';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { AuthUserContext } from '../Session';
import './App.css';

const App = () => (
  <Router>
    <div className="app">
      <div className="top-nav">
        <Navigation />
      </div>
      <div className="sidebar">
      <AuthUserContext.Consumer>
        {authUser => (
          <Sidebar authUser={authUser} />
        )}
      </AuthUserContext.Consumer>
      </div>
      <div className="main">
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.ALL_GEAR} component={AllGear} />
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              <Route path={ROUTES.MY_GEAR} render={(props) => <MyGear {...props} authUser={authUser}/>} />              
              <Route path={ROUTES.MY_BAGS} render={(props) => <MyBags {...props} authUser={authUser} />} />
            </div>
          )}  
        </AuthUserContext.Consumer>
      </div>
     {/* } <Route exact path={ROUTES.ALL_GEAR}  render={(props) => <AllGear {...props}  />} /> */}
    </div>
  </Router>
);

export default withAuthentication(App);