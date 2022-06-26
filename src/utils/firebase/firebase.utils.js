import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    Firestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-3DkwGkqpDUm_ui3nHYy924clp6rYpbg",
  authDomain: "crwn-clothing-db-98648.firebaseapp.com",
  projectId: "crwn-clothing-db-98648",
  storageBucket: "crwn-clothing-db-98648.appspot.com",
  messagingSenderId: "275828712206",
  appId: "1:275828712206:web:b2b568a5a495b707312d5f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
            
        }catch(error){
            console.log('error create the user', error.message)
            return null;
        }
    }
    return userDocRef;
}