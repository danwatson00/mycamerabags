import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TopNav from '../TopNav';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import NavBar from '../NavBar';
import AllGear from '../AllGear';
import AllBags from '../AllBags';
import MyGear from '../MyGear';
import MyBags from '../MyBags';
import CookiesWarning from '../CookiesWarning';
import CookiesModal from '../CookiesModal';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { AuthUserContext } from '../Session';
import MessageCenter from '../MessageCenter';
import './App.css';

const App = () => {

  const [cookiesWarningVisible, setCookiesWarningVisible] = useState(true);
  const [cookiesModalVisible, setCookiesModalVisible] = useState(false);

  function handleHideCookiesWarning() {
    setCookiesWarningVisible(false);
  }
  function handleHideCookiesModal() {
    setCookiesModalVisible(false);
  }

  return (
    <Router>
      <div id="app">
        <div id="top-nav">
          <h1 style={{ width: 200, display: 'inline-block' }} className="logo"><Link to={ROUTES.HOME} >My Camera Bags</Link></h1>
          <AuthUserContext.Consumer>
          {authUser => (
            <TopNav authUser={authUser} />
          )}
          </AuthUserContext.Consumer>
        </div>
        <div id="nav-bar">
          <AuthUserContext.Consumer>
            {authUser => (
              <NavBar authUser={authUser} />
            )}
          </AuthUserContext.Consumer>
        </div>
        <div id="main">
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <AuthUserContext.Consumer>
            {authUser => (
              <div>
                <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route exact path={ROUTES.ADMIN} component={AdminPage} />
                <Route exact path={ROUTES.ALL_GEAR} render={() => <AllGear authUser={authUser} />} />
                <Route exact path={ROUTES.ALL_BAGS} render={(props) => <AllBags {...props} authUser={authUser}/>} />
                <Route path={ROUTES.MY_GEAR} render={(props) => <MyGear {...props} authUser={authUser}/>} />              
                <Route path={ROUTES.MY_BAGS} render={(props) => <MyBags {...props} authUser={authUser} />} />
                
              </div>
            )}
          </AuthUserContext.Consumer>
        </div>
        <div id="right-sidebar">
          
        </div>
      {/* } <Route exact path={ROUTES.ALL_GEAR}  render={(props) => <AllGear {...props}  />} /> */}
      <MessageCenter />
      {/* {cookiesWarningVisible &&
            <CookiesWarning handleHideWarning={handleHideCookiesWarning} />
          }
          {cookiesModalVisible &&
            <CookiesModal handleHideModal={handleHideCookiesModal}/>
          } */}
      </div>
    </Router>
  );
}

export default withAuthentication(App);