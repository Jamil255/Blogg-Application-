import {
  addDoc,
  collection,
  getDocs,
  db,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from './firebase.js'
var exampleModal1 = document.getElementById('exampleModal')

var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
  keyboard: false,
})
window.addEventListener('load', async () => {
  let uid = localStorage.getItem('uid')
  if (!uid) {
    location.replace('./index.html')
    return
  }
  let tempArr = []
  const querySnapshot = await getDocs(collection(db, 'blogs'))
  querySnapshot.forEach((doc) => {
    tempArr.push({
      title: doc.data().title,
      desc: doc.data().desc,
      image: doc.data().image,
      id: doc.id,
      uid: doc.data().uid,
      blogId: doc.id,
      isPrivate: doc.data().isPrivate,
    })
  })
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i].privatePost && tempArr[i].uid === uid) {
      ul.innerHTML += listUi(
        tempArr[i].title,
        tempArr[i].desc,
        tempArr[i].image,
        tempArr[i].id,
        tempArr[i].isPrivate
      )
    } else {
      ul.innerHTML += listUi(
        tempArr[i].title,
        tempArr[i].desc,
        tempArr[i].image,
        tempArr[i].id,
        tempArr[i].isPrivate
      )
    }
  }
})

async function createBlog() {
  let blogImage = document.getElementById('blogImage')
  let imageUrl
  if (blogImage.files[0]) {
    imageUrl = await imageUpload(blogImage.files[0])
  } else {
    imageUrl = 'https://picsum.photos/200'
  }

  let desc = document.getElementById('desc')
  let title = document.getElementById('title')
  let uid = localStorage.getItem('uid')
  let privatePost = document.getElementById('privatePost').checked
  if (!desc.value && !title.value) {
    alert('Missing input field')
    return
  }

  let blogObj = {
    title: title.value,
    desc: desc.value,
    uid: uid,
    image: imageUrl,
    isPrivate: privatePost,
  }
  const docRef = await addDoc(collection(db, 'blogs'), blogObj)
  ul.innerHTML += listUi(
    title.value,
    desc.value,
    imageUrl,
    docRef.id,
    privatePost
  )
  myModal.hide()
  title.value = ''
  desc.value = ''
}
let ul = document.getElementById('ul')
function listUi(title, desc, image, id, isPrivate) {
  let lockValue = ''
  if (isPrivate) {
    lockValue = `<i class="fa-solid fa-lock"></i>`
  } else {
    lockValue = ''
  }
  let ui = `<div class="card contianer" style="width: 18rem">
    <img src=${image} class="card-img-top" alt="..."  height="140px"/>
    <div class="card-body ">
        <h6 class="card-title">${title}  ${lockValue}</h6>
        <p class="card-text" >
           ${desc}
        </p>
    </div>
</div>
`
  return ui
}
function imageUpload(file) {
  return new Promise(function (resolve, reject) {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break
          case 'storage/canceled':
            // User canceled the upload
            break

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          resolve(downloadURL)
        })
      }
    )
  })
}
function LogoutFun(ele) {
    localStorage.clear()
    location.replace("./index.html")
}

window.createBlog = createBlog
window.LogoutFun=LogoutFun
