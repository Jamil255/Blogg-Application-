import { doc, getDoc, db } from "./firebase.js"

window.addEventListener("load", mySettingFun)
async function mySettingFun() {
    let uid = localStorage.getItem("uid")
    console.log(uid);
    if (!uid) {
        location.replace('./index.html')
        return
    }


    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    let userProfile = document.getElementById("userProfile")

    if (docSnap.exists()) {
        console.log(docSnap.data());
        let userObj = {
            firstName: docSnap.data().FirstName,
            lastName: docSnap.data().lastName,
            email: docSnap.data().email,
            phone: docSnap.data().userNum,
        }
        console.log(userObj.firstName);

        let userUi =`<div class="card parentprofile">
        <div class="card-body">
            <h5 class="card-title">User Information</h5>
            <ul class="list-group list-group-flush listitems">
                <li class="list-group-item"><strong>First Name:</strong> ${userObj.firstName}</li>
                <li class="list-group-item"><strong>Last Name:</strong> ${userObj.lastName}</li>
                <li class="list-group-item"><strong>Email:</strong> ${userObj.email}</li>
                <li class="list-group-item"><strong>Phone Number:</strong> ${userObj.phone}</li>
            </ul>
        </div>
    </div>`;

        userProfile.innerHTML += userUi
    } else {
        console.log("No such document!");
    }
}
function LogoutFun(ele) {
    localStorage.clear()
    location.replace("./index.html")
}

window.LogoutFun = LogoutFun 