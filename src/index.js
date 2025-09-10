import { initializeApp } from "firebase/app";

import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from "firebase/firestore"

import {
    getAuth,
    createUserWithEmailAndPassword
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAXNfybclkDYxSlA1dTFj1TUZYPhWR10d0",
  authDomain: "fir-9-tutorial-48d10.firebaseapp.com",
  projectId: "fir-9-tutorial-48d10",
  storageBucket: "fir-9-tutorial-48d10.firebasestorage.app",
  messagingSenderId: "374619808371",
  appId: "1:374619808371:web:4cc1143be3d10f5c1d8006"
}

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, "books")

// queries
const q = query(colRef, orderBy("createdAt"))

// get collection data
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})
    })

    console.log(books)
})

// Adding documents
const addBookForm = document.querySelector(".add")
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
    .then(()=>{
        addBookForm.reset()
    })

})

// Deleting documents
const deleteBookForm = document.querySelector(".delete")
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const docRef = doc(db, "books", deleteBookForm.id.value)

    deleteDoc(docRef)
    .then(() => {
        deleteBookForm.reset()
    })
})

// Get a single document
const docRef = doc(db, "books", "uwR1LTbV0HCXfA5TnFNW")

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// Updating documents
const updateBookForm = document.querySelector(".update")
updateBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const docRef = doc(db, "books", updateBookForm.id.value)

    updateDoc(docRef, {
        title: "New Title"
    })
    .then(() => {
        updateBookForm.reset()
    })
})

// Updating documents
const signupForm = document.querySelector(".signup")
signupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log("User created: ",cred.user)
        signupForm.reset()
    })
    .catch(err => {
        console.log(err)
    })
})