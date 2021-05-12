import { Component } from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase extends Component {
  constructor(props) {
    super(props);
    app.initializeApp(config);

    /* Helper */
    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;
    
   /*  Firebase APIs */
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User APIs ***

  user = (uid) => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');

  getAllUsers = () => this.db.collection('users').get();

  // *** Message APIs ***

  message = uid => this.db.doc(`messages/${uid}`);

  messages = () => this.db.collection('messages');
  
  // *** Global Gear APIs ***

  getAllUsersBags = () => {
    let users = this.getAllUsers();
    let allGear = [];
    users.forEach(x => {
      let bags = this.getMyBags(x.uid);
      allGear.push(bags);
    });
  }
  getAllGear = () => this.db.collection('gear').get();

  getAllBags = () => this.db.collectionGroup('userBags').get();

  getAllUsersData = () => this.db.collection('users').get();

  createGear = (gearData) => this.db.collection('gear').add(gearData).then(function(docRef) {
    docRef.update({
      uid: docRef.id
    });
  });

  createUserGear = (gearData, userId) => this.db.collection(`users/${userId}/userGear`).add(gearData).then(function (docRef) {
    docRef.update({
      uid: docRef.id
    });
  });

  updateGear = (item, id) => this.db.collection('gear').doc(id).update(item).then(() => {
    console.log("gearUpdated");
  }).catch(error => {
    console.log("error", error);
  });

  deleteGear = (id) => this.db.collection('gear').doc(id).delete();

  // User Gear APIs ***

  /* addToUserGear = (gearData) => this.db.collection('userGear').doc().set(gearData); */
  addToUserGear = (userId, gearData) => this.db.collection('users').doc(userId).collection('userGear').add(gearData).then(function(docRef) {
    docRef.update({
      uid: docRef.id
    });
  }).catch(error => {
    console.log("error", error);
  });

  updateUserGear = (item, id, userId) => this.db.collection(`users/${userId}/userGear`).doc(id).update(item);

  deleteUserGear = (userId, id) => this.db.collection(`users/${userId}/userGear`).doc(id).delete();

  getMyGear = (userId) => this.db.collection(`users/${userId}/userGear`).get();

  getMyBags = userId => this.db.collection(`users/${userId}/userBags`).get();

  createBag = (userId, bagData) => this.db.collection(`users/${userId}/userBags`).add(bagData).then(function(docRef) {
    docRef.update({
      uid: docRef.id
    });
  });
  
  deleteBag = (userId, bagId) => this.db.collection(`users/${userId}/userBags`).doc(bagId).delete();
  
  updateBag = (userId, bagId, bagData) => this.db.collection(`users/${userId}/userBags`).doc(bagId).update(bagData);

  updateBagGear = (userId, bagId, bagGear) => this.db.collection(`users/${userId}/userBags`).doc(bagId).update({ 
    bagGear: bagGear 
  });

  addToUserBag = (userId, userGearId, userBagId, rank) => this.db.collection(`users/${userId}/userBags`).doc(userBagId).update({
    bagGear: this.fieldValue.arrayUnion({ gearId: userGearId, rank: rank })
  });

  deleteFromUserBag = (userId, userGearId, userBagId) => this.db.collection(`users/${userId}/userBags`).doc(userBagId).update({
    bagGear: this.fieldValue.arrayRemove(userGearId)
  });

  saveImage = (file) => {
    const storageRef = this.storage.ref();
    const imagesRef = storageRef.child('images');
    const imageRef = imagesRef.child(file.name);
    imageRef.put(file).then(function (reference) {
      console.log('Uploaded a blob or file!', reference.metadata.fullPath);
      storageRef.child(reference.metadata.fullPath).getDownloadURL().then((url) => {
        console.log("url", url);
        return url;
      });
    });;
  }

  downloadImage = (filePath) => {
    const storageRef = this.storage.ref();
    storageRef.child(filePath).getDownloadURL().then((url) => {
      console.log("url", url);
      return url;
    }).catch((error) => {
      console.log("download error", error);
    });
  
  }
}
export default Firebase;