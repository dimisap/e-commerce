import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
//  signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBucNlVKLA3Pt39ZSjcCP4Guq4wEdpucmY",
    authDomain: "crwn-clothing-db-97cbe.firebaseapp.com",
    projectId: "crwn-clothing-db-97cbe",
    storageBucket: "crwn-clothing-db-97cbe.appspot.com",
    messagingSenderId: "1023516042268",
    appId: "1:1023516042268:web:2bc5280594a21cb1612bd9"
  };
  

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
//export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);      //παει στο document

    const userSnapshot = await getDoc(userDocRef);      //παιρνει τα ντατα
    
    if(!userSnapshot.exists()){         //ειναι boolean, και ελεγχει αν υπαρχει το usersnapshot
        const { displayName, email } = userAuth     //παιρνω ονομα και μειλ απο το userAuth που εχει ολες τις πληροφοριες απο το gmail
        const createdAt = new Date();               //τσιμπαω timestamp
    
        try{
            await setDoc(userDocRef, {      //setDoc για να φτιαξω το document στη βαση και του περναω τα στοιχεια απο κατω
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log("error creating the user", error.message);
        }
    }
    return userDocRef           //γυρναω τα data. αν δεν υπηρχαν, τα εφτιαξα ακριβως απο πανω, αν ηδη υπηραχαν τοτε κομπλε
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
}