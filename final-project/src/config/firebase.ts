import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAaAwV5_8Qn0W9IQlw2YaNz2aDWTStDT3M",
    authDomain: "iit-class-97aa7.firebaseapp.com",
    projectId: "iit-class-97aa7",
    storageBucket: "iit-class-97aa7.firebasestorage.app",
    messagingSenderId: "619919329643",
    appId: "1:619919329643:web:28f6455f8666e447e9e42e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
