
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { 
    getFirestore, 
    doc,
    setDoc,
    getDoc,
    Timestamp 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 🔹 Your Firebase Config
const firebaseConfig = {
                apiKey: "AIzaSyBjm6WKCRmUNILEub4lKecRx11Lwvf-koM",
    authDomain: "tn-voting-d09c5.firebaseapp.com",
    projectId: "tn-voting-d09c5",
    storageBucket: "tn-voting-d09c5.appspot.com",
    messagingSenderId: "739902489472",
    appId: "1:739902489472:web:362809592ddf36884c3765"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function insertdata() {
const name=document.getElementById("name").value.trim();
    const aadhar = document.getElementById("aadhar").value.trim();
    const birth = document.getElementById("birth").value;
    const ph_no = document.getElementById("phonenumber").value.trim();
    const vote_id = document.getElementById("voteid").value.trim();
    

   const today = new Date();
    const birthDate= new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if(month <0 || (month ==0&& today.getDate() < birthDate.getDate())){
        age--;
    }
    if(age < 18){
        alert("you must be 18+");
        return;
    }

    if (!aadhar || !birth || !ph_no || !vote_id) {
        message.innerHTML = "<span class='error'>All fields are required!</span>";
        return;
    }

    try {

        const docRef = doc(db, "voting", vote_id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            message.innerHTML = "<span class='error'>Vote ID already registered!</span>";
            return;
        }

        await setDoc(docRef, {
            name :name,
            aadhar: aadhar,
            birth: Timestamp.fromDate(new Date(birth)),
            isvoted: false,
            ph_no: ph_no,
            vote_id: vote_id,
            
        });

        message.innerHTML = "<span class='success'>Registration Successful!</span>";

        // Clear inputs
        document.getElementById("aadhar").value = "";
        document.getElementById("birth").value = "";
        document.getElementById("phonenumber").value = "";
        document.getElementById("voteid").value = "";

    } catch (error) {
        message.innerHTML = "<span class='error'>" + error.message + "</span>";
    }
}

// Safe button event
document.getElementById("submitBtn").addEventListener("click", insertdata);
