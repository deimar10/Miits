import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBuixBamvS8lMlLUSMEd35uXxk5dnjdvHA",
    authDomain: "miits-images.firebaseapp.com",
    projectId: "miits-images",
    storageBucket: "miits-images.appspot.com",
    messagingSenderId: "83218995455",
    appId: "1:83218995455:web:1c613a20ff018e3f0754ca"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);