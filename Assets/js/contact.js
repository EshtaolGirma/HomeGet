var DB2;
var fullname= document.getElementById("fullname");
var email= document.getElementById("email");
var button = document.getElementById("button");
var input = document.querySelectorAll("input");
document.addEventListener("DOMContentLoaded", () => {
    let HomeGet = indexedDB.open("HomeGetDB", 1);
  
    console.log("101");
    HomeGet.onerror = function () {
      console.log("There was an error");
    };
    HomeGet.onsuccess = function () {
      DB1 = HomeGet.result;
  
      let objectStore = DB.transaction("Agents").objectStore("Agents");
      
      console.log(objectStore);
      objectStore.openCursor().onsuccess = function (e) {
        e.preventDefault();
        console.log("we are here");
      button.onclick = function(){
           e.preventDefault();
           input[0].style.borderColor = "gray";
           input[1].style.borderColor = "gray";
           if (
             (fullname.value == null || fullname.value == "") &&
             (email.value == null || email.value == "")
           ) {
             fullname.placeholder = "please enter stg";
             email.placeholder = "please enter stg";
             input[0].style.borderColor = "red";
             input[1].style.borderColor = "red";
           } else if (fullname.value == null || fullname.value == "") {
             fullname.placeholder = "please enter stg";
             input[0].style.borderColor = "red";
           }
           else if (email.value == null || email.value == "") {
             email.placeholder = "please enter stg";
             input[1].style.borderColor = "red";
       }
       else{
           console.log("there was an error")
       }


}
      }
    };
});