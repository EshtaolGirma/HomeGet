var DB;
// const loginBtn;
var user = document.getElementById("user");
var pass = document.getElementById("pass");
var button = document.getElementById("button");
var input = document.querySelectorAll("input");
document.addEventListener("DOMContentLoaded", () => {
  let HomeGet = indexedDB.open("HomeGetDB", 1);

  console.log("101");
  HomeGet.onerror = function () {
    console.log("There was an error");
  };
  HomeGet.onsuccess = function () {
    DB = HomeGet.result;

    let objectStore = DB.transaction("Agents").objectStore("Agents");

    console.log(objectStore);
    objectStore.openCursor().onsuccess = function (e) {
      console.log("we are here");
      let cursor = e.target.result;
      console.log(cursor.value.AgentEmail);
      console.log(cursor.value.AgentPassword);

      function userChecker() {
        if (cursor) {
          if (
            user.value == cursor.value.AgentEmail &&
            pass.value == cursor.value.AgentPassword
          ) {
            return 0;
          } else {
            return 1;
          }
        }
      }

      button.onclick = function () {
        e.preventDefault();
        input[0].style.borderColor = "gray";
        input[1].style.borderColor = "gray";
        if (
          (user.value == null || user.value == "") &&
          (pass.value == null || pass.value == "")
        ) {
          user.placeholder = "please enter stg";
          pass.placeholder = "please enter stg";
          input[0].style.borderColor = "red";
          input[1].style.borderColor = "red";
        } else if (user.value == null || user.value == "") {
          user.placeholder = "please enter stg";
          input[0].style.borderColor = "red";
        } else if (pass.value == null || pass.value == "") {
          pass.placeholder = "please enter stg";
          input[1].style.borderColor = "red";
        } else if (userChecker() == 0) {
          console.log("successful");
          window.location.href = "index.html";
        } else {
          console.log("Wrong username or password");
        }
      };
    };
  };
});
