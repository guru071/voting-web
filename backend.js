import { db } from "./firebase.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
document.querySelector(".nextbtn")
  .addEventListener("click", click_next);

async function click_next() {

  const voteid = document.getElementById("voteid").value;
  sessionStorage.setItem("voteid", voteid);
  console.log(sessionStorage.getItem("voteid"));
  const birth = new Date(document.getElementById("birth").value);

  if (!voteid) {
    alert("Enter vote id");
    return;
  }
  try {
    const docRef = doc(db, "voting", voteid);
    const docSnap = await getDoc(docRef);
    if (voteid == docSnap.data().vote_id) {
      const ddate = docSnap.data().birth.toDate();
      if (docSnap.exists()) {

        console.log("--- DEBUGGING INFO ---");
        console.log("1. Vote IDs match?", voteid == docSnap.data().vote_id);
        console.log("   Input Vote ID: '" + voteid + "'");
        console.log("   DB Vote ID: '" + docSnap.data().vote_id + "'");

        console.log("2. Years match?", ddate.getFullYear() === birth.getFullYear());
        console.log("   Input Year:", birth.getFullYear(), "| DB Year:", ddate.getFullYear());

        console.log("3. Months match?", ddate.getMonth() === birth.getMonth());
        console.log("   Input Month:", birth.getMonth(), "| DB Month:", ddate.getMonth());

        console.log("4. Dates match?", ddate.getDate() === birth.getDate());
        console.log("   Input Date:", birth.getDate(), "| DB Date:", ddate.getDate());
        console.log("----------------------");
        console.log(ddate.getFullYear() == birth.getFullYear() && ddate.getMonth() == birth.getMonth() && ddate.getDate() == birth.getDate());
        console.log(voteid == docSnap.data().vote_id && (ddate.getFullYear() == birth.getFullYear() && ddate.getMonth() == birth.getMonth() && ddate.getDate() == birth.getDate()));

        if (ddate.getFullYear() == birth.getFullYear() && ddate.getMonth() == birth.getMonth() && ddate.getDate() == birth.getDate()) {

          console.log(docSnap.data().isvoted === "true");
          console.log(typeof docSnap.data().isvoted);
          if (docSnap.data().isvoted === true) {
            alert("you are already voted");
            return;
          }
          alert("you are eligible to vote!");
          sessionStorage.setItem("isvoted", "true");
          sessionStorage.setItem("vote_found", "true");


          window.location.href = "aadhar.html";

        } else {
          alert("Invalid Login Details");
        }
      }
    } 
  } catch (error) {
    alert("Record not found");
  }

}
