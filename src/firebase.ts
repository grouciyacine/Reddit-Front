import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBI4bpdW4z6R4S3DpWBiBgmm6AkxVf3uB8",
  authDomain: "viber-clone-3820e.firebaseapp.com",
  projectId: "viber-clone-3820e",
  storageBucket: "viber-clone-3820e.appspot.com",
  messagingSenderId: "197665996786",
  appId: "1:197665996786:web:db964457d5471ad43b756b",
  measurementId: "G-FWZN3ELDJT"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app