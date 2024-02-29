import {
    collection,
    getDocs,
    db,
    deleteDoc,
    doc,
    updateDoc,
} from './firebase.js'
let exampleModal = document.getElementById('exampleModal')
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false,
})
let parent = document.getElementById('parent')
window.addEventListener('load', pageLoad)
async function pageLoad() {
    let uid = localStorage.getItem('uid')
    if (!uid) {
        location.replace('./index.html')
    }

    let blogArr = []
    if (uid === uid) {
        const querySnapshot = await getDocs(collection(db, 'blogs'))
        querySnapshot.forEach((doc) => {
            blogArr.push({
                title: doc.data().title,
                desc: doc.data().desc,
                image: doc.data().image,
                id: doc.id,
                uid: doc.data().uid,
                blogId: doc.id,
                isPrivate: doc.data().isPrivate,
            })
        })

        for (let value of blogArr) {
            parent.innerHTML += listUi(
                value.title,
                value.desc,
                value.image,
                value.blogId,
                value.isPrivate
            )
        }
    }
}

function listUi(title, desc, image, id, isPrivate) {
    let lockValue = ''
    if (isPrivate) {
        lockValue = `<i class="fa-solid fa-lock"></i>`
    } else {
        // lockValue
    }
    let ui = `<div class="card contianer"  style="width: 18rem" id="cardsUi">
        <img src=${image} class="card-img-top" alt="..."  height="140px"/>
        <div class="card-body ">
            <h6 class="card-title">${title}  ${lockValue}</h6>
            <p class="card-text" >
               ${desc}
            </p>
            <button class="btn btn-danger" id=${id}  onclick="deleteBlog(this)" >DELETE</button>
            <button class="btn btn-info"  id=${id} onclick="editBlog(this)" >EDIT</button>
            </div>
    </div>
    `
    return ui
}

function LogoutFun(ele) {
    localStorage.clear()
    location.replace('./index.html')
}
async function deleteBlog(ele) {
    let blogId = ele.id
    console.log(blogId)
    await deleteDoc(doc(db, 'blogs', blogId))
    let cardsUi = document.getElementById("cardsUi")
    cardsUi.remove()

}

async function editBlog(ele) {
    myModal.show()
    let blogId = ele.id
    console.log(blogId)
    let title = document.getElementById('title')
    let desc = document.getElementById('desc')
    title.value = ele.parentNode.firstElementChild.innerHTML
    desc.value = ele.parentNode.firstElementChild.nextElementSibling.innerHTML
    //   updateValue(blogId)
    btnUpdate.addEventListener('click', valueUpdate)
    async function valueUpdate() {
        let blogId = ele.id
        const washingtonRef = doc(db, 'blogs', blogId)

        await updateDoc(washingtonRef, {
            title: title.value,
            desc: desc.value,
        })
        myModal.hide()
    }
}

window.LogoutFun = LogoutFun
window.deleteBlog = deleteBlog
window.editBlog = editBlog
