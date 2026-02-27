window.onload = function () {
  
  const vote_found = sessionStorage.getItem("vote_found");
const aadhar_found = sessionStorage.getItem("aadhar_found");
  if (vote_found !== "true" || aadhar_found !=="true") {
    alert("Unauthorized access");
    window.location.href = "voting.html";
  }
};

const candidates = document.querySelectorAll(".candidate");
const voteBtn = document.getElementById("voteBtn");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

let selectedCandidate = null;
let confirmed = false;

/* SELECT CANDIDATE */
candidates.forEach(card=>{

    card.addEventListener("click",()=>{

        if(confirmed) return;

        candidates.forEach(c=>c.classList.remove("selected"));

        card.classList.add("selected");

        selectedCandidate = card.querySelector("h3").innerText;

        showMessage("Selected: " + selectedCandidate,"info");

    });

});

/* VOTE BUTTON */
voteBtn.addEventListener("click",()=>{

    if(!selectedCandidate){
        showMessage("Please select a candidate first!","error");
        return;
    }

    if(confirm("Confirm selection: "+selectedCandidate+" ?")){

        confirmed = true;

        submitBtn.disabled = false;
        voteBtn.disabled = true;

        showMessage("Selection confirmed. Now submit your vote.","info");
    }

});

/* SUBMIT BUTTON */
submitBtn.addEventListener("click",()=>{

    if(!confirmed) return;

    localStorage.setItem("voted","true");
    localStorage.setItem("candidate",selectedCandidate);

    showMessage("✅ Vote submitted successfully!","success");

    disableAll();

});

/* MESSAGE */
function showMessage(text,type){

    message.style.display="block";
    message.className="message "+type;
    message.innerText=text;

}

/* DISABLE */
function disableAll(){

    candidates.forEach(c=>c.style.pointerEvents="none");

    submitBtn.disabled=true;
    voteBtn.disabled=true;

}
const exportBtn = document.getElementById("exportBtn");

/* STORE VOTES */
function saveVote(candidateName) {

    let votes = JSON.parse(localStorage.getItem("votes")) || {};

    if (typeof votes !== "object" || Array.isArray(votes)) {
        votes = {};
    }

    votes[candidateName] = (votes[candidateName] || 0) + 1;

    localStorage.setItem("votes", JSON.stringify(votes));
}


/* MODIFY SUBMIT BUTTON */
submitBtn.addEventListener("click", () => {

    if (!confirmed) return;

    saveVote(selectedCandidate);

    showMessage("✅ Vote submitted successfully!", "success");

    disableAll();
});


/* EXPORT TO EXCEL (CSV) */
exportBtn.addEventListener("click", () => {

    let votes = JSON.parse(localStorage.getItem("votes"));

    if (!votes || typeof votes !== "object") {
        alert("No votes recorded yet!");
        return;
    }

    let csv = "Candidate,Votes\n";

    Object.entries(votes).forEach(([candidate, count]) => {
        csv += `"${candidate}",${count}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Voting_Results.csv";
    link.click();

    URL.revokeObjectURL(url);
});

