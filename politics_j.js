polictics_name=["tvk","ntk","dmk","admk","nota","pmk"];
const table=document.getElementsByClassName("table_");
for(i=0;i<polictics_name.length;i++){
    table.innerHTML +="<tr><td>${polictics_name}</td><td></td><td></td></tr>";
}