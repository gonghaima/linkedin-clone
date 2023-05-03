// eslint-disable-next-line @typescript-eslint/no-empty-function
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const LoginAPI = (email: string, password: string) => {
  try {
    signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};
