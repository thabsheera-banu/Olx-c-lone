import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlGJuBn0aadmO0j6ilYWvyoWItoRnbMFk",
    authDomain: "olx-clone-2bee4.firebaseapp.com",
    projectId: "olx-clone-2bee4",
    storageBucket: "olx-clone-2bee4.appspot.com",
    messagingSenderId: "1083781211647",
    appId: "1:1083781211647:web:c8e8460884ec6752f4f3ca",
    measurementId: "G-M4LRGMEB6Z"
  };

export default firebase.initializeApp(firebaseConfig)