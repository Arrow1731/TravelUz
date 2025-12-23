// // lib/firebase.ts
// import { initializeApp, getApps, getApp } from "firebase/app"
// import { getAuth } from "firebase/auth"
// import { getFirestore } from "firebase/firestore"

// const firebaseConfig = {
//   apiKey: "AIzaSyCXM1kkAH_uK-MPMZ40ZHYx0EG3ZIUuqbQ",
//   authDomain: "traveluz-captain.firebaseapp.com",
//   projectId: "traveluz-captain",
//   storageBucket: "traveluz-captain.firebasestorage.app",
//   messagingSenderId: "547208657148",
//   appId: "1:547208657148:web:da770b33fbea1eb8eb7f79",
// }

// const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// export const auth = getAuth(app)
// export const db = getFirestore(app)








import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCXM1kkAH_uK-MPMZ40ZHYx0EG3ZIUuqbQ",
  authDomain: "traveluz-captain.firebaseapp.com",
  projectId: "traveluz-captain",
  storageBucket: "traveluz-captain.firebasestorage.app",
  messagingSenderId: "547208657148",
  appId: "1:547208657148:web:da770b33fbea1eb8eb7f79",
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)