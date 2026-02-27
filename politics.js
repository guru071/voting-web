/* ELEMENTS */
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


/* SUBMIT BUTTON */
submitBtn.addEventListener("click", () => {

    if (!confirmed) return;

    showMsg("✅ Vote submitted successfully!", "success");

    disableAll();

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