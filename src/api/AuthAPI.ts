// eslint-disable-next-line @typescript-eslint/no-empty-function
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const LoginAPI = (
  email: string,
  password: string
): Promise<UserCredential> | unknown => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // alert(error.errors.message);
    return error;
  }
};

export const RegisterAPI = (email: string, password: string) => {
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

export const onLogout = () => {
  try {
    signOut(auth);
  } catch (err) {
    return err;
  }
};
