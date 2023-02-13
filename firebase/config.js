import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7nfyah3hEiGokyAm6q5h-X7uHjofzOyU",
  authDomain: "reactnativeapp-dcf83.firebaseapp.com",
  projectId: "reactnativeapp-dcf83",
  storageBucket: "reactnativeapp-dcf83.appspot.com",
  messagingSenderId: "316443194739",
  appId: "1:316443194739:web:f17cd73e0feab7d6284106",
  measurementId: "G-D065XYLSCT",
};

export default firebase.initializeApp(firebaseConfig);
