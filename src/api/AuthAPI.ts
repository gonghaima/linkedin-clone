// eslint-disable-next-line @typescript-eslint/no-empty-function
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const LoginAPI = (email: string, password: string) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error.errors.message);
    return error;
  }
};

export const RegisterAPI = (email, password) => {
  try {
    const response = createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};

export const GoogleSignInAPI = () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = signInWithPopup(auth, googleProvider);
    return res;
  } catch (err) {
    return err;
  }
};
