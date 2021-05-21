import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { SignInGoogle, SignInFacebook, SignInTwitter } from '../SignIn';
import './SignUp.css';

const SignUpPage = () => (
  <div id="sign-up-grid">
    <div id="sign-up-card">
      <h4 style={{ color: '#808080', marginTop: 5 }}>SIGN UP FOR FREE</h4>
      <h2>Sign up for My Camera Bags</h2>
      <SignUpForm isSignUp={true} />
    </div>
    <div id="sign-up-social">
      <span>TEST</span>
      <h3 style={{ color: '#808080', textAlign: 'center' }}>Or</h3>
      <h4 style={{ color: '#808080', textAlign: 'center' }}>Sign in with social media</h4>
      <div className="sign-up-social-button"><SignInGoogle isSignUp={true} /></div>
      <div className="sign-up-social-button"><SignInFacebook isSignUp={true} /></div>
      <div className="sign-up-social-button"><SignInTwitter isSignUp={true} /></div>
    </div>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
          uid: authUser.user.uid
        },
        {
          merge: true
        }, 
      );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-group">
          <label>
            Admin:
            <input
              name="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={this.onChangeCheckbox}
            />
          </label>
        </div>
        <button  className="pull-right" disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export { SignUpForm, SignUpLink };