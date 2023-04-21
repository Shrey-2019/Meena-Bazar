import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getFirestore ,collection, getDocs,query, where, setDoc, doc, addDoc, updateDoc} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'
  
const firebaseConfig = {
    apiKey: "AIzaSyCsYpds_lkQ_CeXUqxknQvOR69QFd4mxKc",
    authDomain: "meena-bazar-4c96f.firebaseapp.com",
    projectId: "meena-bazar-4c96f",
    storageBucket: "meena-bazar-4c96f.appspot.com",
    messagingSenderId: "449248561195",
    appId: "1:449248561195:web:fa04c09139ee535f8b426e",
    measurementId: "G-0NR2MLHE2G"
};

const firebaseApp = initializeApp(firebaseConfig);


export {initializeApp, firebaseConfig, firebaseApp, getFirestore, collection, getDocs, query, where, setDoc, doc, addDoc, updateDoc}