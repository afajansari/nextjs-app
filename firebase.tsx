import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCDFYJTJ0d0qz7HgRZ0NnNPUfawIaPrTwc",
    authDomain: "nextjs-app-eb3cb.firebaseapp.com",
    projectId: "nextjs-app-eb3cb",
    storageBucket: "nextjs-app-eb3cb.appspot.com",
    messagingSenderId: "1031698672225",
    appId: "1:1031698672225:web:6e70b3d31dbdf195c7d820"
};
  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };