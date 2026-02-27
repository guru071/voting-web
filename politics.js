window.onload = function () {
  
  const vote_found = sessionStorage.getItem("vote_found");
const aadhar_found = sessionStorage.getItem("aadhar_found");
  if (vote_found !== "true" || aadhar_found !=="true") {
    alert("Unauthorized access");
    window.location.href = "voting.html";
  }
};

/* ELEMENTS */
const rows = document.querySelectorAll(".candidate-row");
const voteBtn = document.getElementById("voteBtn");
const submitBtn = document.getElementById("submitBtn");
const exportBtn = document.getElementById("exportBtn");
const message = document.getElementById("message");

/* STATE */
let selectedRow = null;
let confirmed = false;


/* ROW CLICK */
rows.forEach(row=>{

    row.addEventListener("click",()=>{

        if(confirmed) return;

        rows.forEach(r=>r.classList.remove("selected"));

        row.classList.add("selected");

        row.querySelector("input").checked = true;

        selectedRow = row;

        showMsg("Selected: "+row.dataset.leader,"info");

    });

});


/* VOTE */
voteBtn.addEventListener("click",()=>{

    if(!selectedRow){
        showMsg("Please select a candidate!","error");
        return;
    }

    const leader = selectedRow.dataset.leader;

    if(confirm("Confirm vote for "+leader+" ?")){

        confirmed = true;

        voteBtn.disabled = true;
        submitBtn.disabled = false;

        showMsg("Selection confirmed. Click Submit.","info");
    }

});


/* SUBMIT */
submitBtn.addEventListener("click",()=>{

    if(!confirmed) return;

    const data = {
        party: selectedRow.dataset.party,
        leader: selectedRow.dataset.leader,
        time: new Date().toLocaleString()
    };

    localStorage.setItem("voteData",JSON.stringify(data));

    showMsg("✅ Vote submitted successfully!","success");

    disableAll();

});


/* EXPORT */
exportBtn.addEventListener("click",()=>{

    const data = JSON.parse(localStorage.getItem("voteData"));

    if(!data){
        alert("No vote found!");
        return;
    }

    let csv = "Party,Leader,Time\n";
    csv += `${data.party},${data.leader},${data.time}`;

    const blob = new Blob([csv],{type:"text/csv"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "vote_result.csv";
    a.click();

    URL.revokeObjectURL(url);

});


/* HELPERS */

function showMsg(text,type){

    message.style.display="block";
    message.className=type;
    message.innerText=text;

}

function disableAll(){

    rows.forEach(r=>{
        r.style.pointerEvents="none";
    });

    submitBtn.disabled=true;

}
