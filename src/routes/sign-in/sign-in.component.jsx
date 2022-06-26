import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

import { getRedirectResult } from "firebase/auth";

import { useEffect } from "react";

const SignIn = () => {

    useEffect(() => {
        async function fetchData() {
          // You can await here
          const response = await getRedirectResult(auth);
          if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
          }
        }
        fetchData();
      }, []); // Or [] if effect doesn't need props or state

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};

export default SignIn;
