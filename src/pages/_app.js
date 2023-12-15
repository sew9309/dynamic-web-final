import { useCallback, useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import Header from "../app/components/Header";
import firebaseConfig from "@/app/components/firebaseConfig";

export default function MyApp({ Component, pageProps }) {
    const [appInitialized, setAppInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState(null);
    const [error, setError] = useState(null);
    //const db = getFirestore();

const createUser = useCallback(async(e) =>{
    e.preventDefault();
    // Assign Email and Password to variables from form
    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    // Create a reference to the auth object
    const auth = getAuth();
    const db = getFirestore();
    let user;

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            user = userCredential.user;
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({ error, errorCode, errorMessage });
            setError(errorMessage);
    });

    //Create User reference in firestore
    await addDoc(collection(db, "users"), {
        name: name,
        userId: user.uid,
        //YOU CAN ADD ADDITIONAL INFORMATION HERE (EX: DESCRIPTION, BIO)
    })
    .then(()=> {
        const userToSet = { ...user, name }
          //Since the user is true, set logged in
        setIsLoggedIn(true);
        //Provide some information about the user via setState
        setUserInformation(userToSet);
        //Clear any errors
        setError(null);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ error, errorCode, errorMessage });
        setError(errorMessage);
    })
},
    [setError, setIsLoggedIn, setUserInformation]
 );

const loginUser = useCallback((e) =>{
    e.preventDefault();
    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const auth = getAuth();
    const db = getFirestore();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Create User reference in firestore
            const data = addDoc(collection(db, "users"), {
                name: name,
                userId: user.uid,
            });
            if(data) {
            //Since the user is true, set logged in
            setIsLoggedIn(true);
            //Provide some information about the user via setState
            setUserInformation(user);
            //Clear errors
            setError(null);
            }})
        .catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({ error, errorCode, errorMessage });
            setError(errorMessage);
        });
}, [setError, setIsLoggedIn, setUserInformation]);

const logoutUser = useCallback(() => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            setUserInformation(null);
            setIsLoggedIn(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({ error, errorCode, errorMessage});
            setError(errorMessage);
        });
    }, [setError, setIsLoggedIn, setUserInformation, signOut]);

    //Initialize Firebase before accessing
    useEffect(() => {
        initializeApp(firebaseConfig);
        setAppInitialized(true);
    }, []);

    useEffect(() => {
        if (appInitialized) {
            const auth = getAuth();
            
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    //User is signed in
                    setUserInformation(user);
                    setIsLoggedIn(true);
                } else {
                    //User is Signed out
                    setUserInformation(null);
                    setIsLoggedIn(false);
                }
                //setLoading to false when everything is complete
                setIsLoading(false);
            })
        }
    }, [appInitialized]);

    if (isLoading) return null;

    return (
        <>
        <Header isLoggedIn={isLoggedIn} logoutUser={logoutUser}/>
        <Component
        {...pageProps}
        createUser={createUser}
        isLoggedIn={isLoggedIn}
        loginUser={loginUser}
        userInformation={userInformation}
        />
        <p>{error}</p>
        </>
    );
}