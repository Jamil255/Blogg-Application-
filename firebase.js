// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import {
    getFirestore,
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
import {
    getAuth,
    updatePassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"

import {
    getStorage,
    // storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js"


const firebaseConfig = {
    apiKey: "AIzaSyD34RSnPky3N20aMY89yX9YTPKKWLOdOUg",
    authDomain: "blogg-app-f7e5c.firebaseapp.com",
    projectId: "blogg-app-f7e5c",
    storageBucket: "blogg-app-f7e5c.appspot.com",
    messagingSenderId: "182415241591",
    appId: "1:182415241591:web:dd790028b691806527b172"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth();
const storage = getStorage()


export {
    addDoc,
    collection,
    getDocs,
    db,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    updatePassword,
    getAuth,
    auth,
    updateDoc,
    ref,
    getStorage,
    uploadBytesResumable,
    getDownloadURL,
    storage,
}