import '../styles/globals.css';
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Login from './login';
import Loading from './loading';
import { useEffect } from 'react';
import firebase from 'firebase';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      db.collection('user').doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL
      }, { merge: true });
    }
 }, [user]);
  if(loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />
}
export default MyApp
