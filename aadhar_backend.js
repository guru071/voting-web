const inputs = document.querySelector(".inputs");
inputs.addEventListener("input",function (e){
  const target = e.target;
  const val = target.value;
  if(isNaN(val)){
    target.value = "";
    return ;
  }
  console.log(val);
});


const ainputs = document.querySelector(".aadhar");
ainputs.addEventListener("input",function (e){
  const target = e.target;
  const val = target.value;
  if(isNaN(val)){
    target.value = "";
    return ;
  }
  console.log(val);
});
document.querySelector(".nextbtn")
  .addEventListener("click", aadhar_page);

// Check login when page loads
window.onload = function () {
  
  const vote_found = sessionStorage.getItem("vote_found");

  if (vote_found !== "true") {
    alert("Unauthorized access");
    window.location.href = "voting.html";
  }
};

function aadhar_page() {

  const aadharNo = document
    .getElementById("aadharno")
    .value.replaceAll(" ", "");

  if (aadharNo.length === 12 && !isNaN(aadharNo)) {

    alert("Valid Aadhaar");
    const no=parseInt(aadharNo,10);
    if(no==123456789012){
      sessionStorage.setItem("aadhar_found", "true");
      window.location.href = "politics.html";
      
    }

  } else {
    alert("Enter valid Aadhaar number");
  }
}