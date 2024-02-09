// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"

import {
    getDoc,
    setDoc,
    doc,
    db
} from "./firebase.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD34RSnPky3N20aMY89yX9YTPKKWLOdOUg",
    authDomain: "blogg-app-f7e5c.firebaseapp.com",
    projectId: "blogg-app-f7e5c",
    storageBucket: "blogg-app-f7e5c.appspot.com",
    messagingSenderId: "182415241591",
    appId: "1:182415241591:web:dd790028b691806527b172"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function  signUpFun() {
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let FirstName = document.getElementById("FirstName")
    let userNum = document.getElementById("userNum")
    let lastName = document.getElementById("lastName")
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async function (success) {

            let userObj = {
                user_id: success.user.uid,
                email: email.value,
                FirstName: FirstName.value,
                lastName: lastName.value,
                userNum: userNum.value,
            }
            await setDoc(doc(db, "users", success.user.uid), userObj)
            alert("user successfully signup")
            location.href = "./index.html"

        })
        .catch(function (error) {
            console.log(error.code, "error");
            alert(error.code)
        });
}

function loginFun() {
    let email = document.getElementById("email")
    let password = document.getElementById("password")

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then( async function (success) {
            const docRef = doc(db, "users", success.user.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
                localStorage.setItem("uid", success.user.uid)
                localStorage.setItem("userData", JSON.stringify(docSnap.data()))
                console.log(success, "success")
                alert("user successfully login")
                location.replace("./dashborad.html")
            } else {
                // docSnap.data() will be undefined in this case
                alert("something went wrong")
              console.log("No such document!");
            }
          
        })
        .catch(function (error) {
            alert(error.code)
        });
}
window.signUpFun = signUpFun
window.loginFun = loginFun

window.addEventListener("load", () => {
    console.log("Loading");
    let uid = localStorage.getItem("uid")
    console.log(uid)
    if (uid) {
        window.location.replace("./dashborad.html")
        return

    }
})
