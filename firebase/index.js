import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const app = initializeApp({
    apiKey: "AIzaSyA6i0XABMhX_SfL6D8wZHtuccjozTY_VOQ",
    authDomain: "testing-c9f22.firebaseapp.com",
    projectId: "testing-c9f22",
    storageBucket: "testing-c9f22.appspot.com",
    messagingSenderId: "595660388396",
    appId: "1:595660388396:web:438d76b9b1ec43997df989"
});
const storage = getStorage(app);
export default storage;