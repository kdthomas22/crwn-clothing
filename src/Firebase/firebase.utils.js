import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC1COW4yT0nhDm1Jph8LmoE3h39lZ9Je78",
  authDomain: "crwn-db-be517.firebaseapp.com",
  databaseURL: "https://crwn-db-be517.firebaseio.com",
  projectId: "crwn-db-be517",
  storageBucket: "crwn-db-be517.appspot.com",
  messagingSenderId: "525593763178",
  appId: "1:525593763178:web:b9f00f7203e20342915913",
  measurementId: "G-7H4V177BBH",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
