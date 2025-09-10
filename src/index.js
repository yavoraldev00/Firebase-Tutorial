import { initializeApp } from "firebase/app";

import {
    getFirestore, collection, getDocs
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAXNfybclkDYxSlA1dTFj1TUZYPhWR10d0",
  authDomain: "fir-9-tutorial-48d10.firebaseapp.com",
  projectId: "fir-9-tutorial-48d10",
  storageBucket: "fir-9-tutorial-48d10.firebasestorage.app",
  messagingSenderId: "374619808371",
  appId: "1:374619808371:web:4cc1143be3d10f5c1d8006"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, "books")

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id})
        })

        console.log(books)
    })
    .catch(err =>{
        console.log(err)
    })