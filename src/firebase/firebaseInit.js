import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBSz_wmSzzj81hsPGby0AAPTlySZQ8VGOE",
  authDomain: "moj-asistent-2-0.firebaseapp.com",
  projectId: "moj-asistent-2-0",
  storageBucket: "moj-asistent-2-0.appspot.com",
  messagingSenderId: "400259961175",
  appId: "1:400259961175:web:9b310b8574cfbf0b7dae12"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
