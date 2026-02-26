document.querySelector(".nextbtn")
  .addEventListener("click", click_next);

function click_next() {

  const voteid = document.getElementById("voteid").value;
  const birth = document.getElementById("birth").value;

  if (voteid === "guru" && birth === "2026-02-02") {

    // Save login state
    sessionStorage.setItem("vote_found", "true");

    // Go to Aadhaar page
    window.location.href = "aadhar.html";

  } else {
    alert("Invalid Login Details");
  }
}