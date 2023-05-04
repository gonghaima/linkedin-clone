// eslint-disable-next-line @typescript-eslint/no-empty-function
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
    let response = createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};
