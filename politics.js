import { db } from "./firebase.js";

import { doc, updateDoc ,getDoc}
from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";


const voteid=sessionStorage.getItem("voteid");
const docRef = await doc(db,"voting",voteid);
    const docSnap = await getDoc(docRef);
document.addEventListener("DOMContentLoaded", () => {

    const vote_found = sessionStorage.getItem("vote_found");
    const isvoted = sessionStorage.getItem("isvoted");
    const aadhar_found = sessionStorage.getItem("aadhar_found");

    if (vote_found !== "true" && isvoted !== "true" && aadhar_found !== "true" && docSnap.data().isvoted !==true) {
        alert("Unauthorized access");
        window.location.href = "voting.html";
    }

});
const rows = document.querySelectorAll(".candidate-row");
const voteBtn = document.getElementById("voteBtn");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

/* STATE */
let selectedRow = null;
let confirmed = false;


/* ROW CLICK */
rows.forEach(row => {

    row.addEventListener("click", () => {

        if (confirmed) return;

        // Remove previous selection
        rows.forEach(r => r.classList.remove("selected"));

        // Select current
        row.classList.add("selected");

        // Check radio
        row.querySelector("input").checked = true;

        selectedRow = row;

        showMsg("Selected: " + row.dataset.leader, "info");

    });

});


/* VOTE BUTTON */
voteBtn.addEventListener("click", () => {

    if (!selectedRow) {
        showMsg("Please select a candidate!", "error");
        return;
    }

    const leader = selectedRow.dataset.leader;

    const confirmVote = confirm("Confirm vote for " + leader + " ?");

    if (confirmVote) {

        confirmed = true;

        voteBtn.disabled = true;
        submitBtn.disabled = false;

        showMsg("Selection confirmed. Click Submit.", "info");
    }

});
submitBtn.addEventListener("click", async () => {

    if (!confirmed) {
        showMsg("Please confirm first!", "error");
        return;
    }

    try {

        const voteid = sessionStorage.getItem("voteid");

        await updateDoc(doc(db, "voting", voteid), {
            isvoted: true,
            leader: selectedRow.dataset.leader
        });

        showMsg("✅ Vote submitted successfully!", "success");
        sessionStorage.clear("isvoted")

        disableAll();

    } catch (error) {
        console.error(error);
        showMsg("Error submitting vote!", "error");
    }

});


/* HELPERS */

function showMsg(text, type) {

    message.style.display = "block";
    message.className = type;
    message.innerText = text;

}


function disableAll() {

    rows.forEach(row => {
        row.style.pointerEvents = "none";
    });

    submitBtn.disabled = true;

}