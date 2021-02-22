var name1 = document.querySelector("#full_name");
var email1 = document.querySelector("#email_address");
var address1 = document.querySelector("#present_address");
var card1 = document.querySelector("#card_number");
var phone1 = document.querySelector("#phone_number");

let DB1;

let HomeGetDB = window.indexedDB.open("HomeGetDB", 1);
HomeGetDB.onsuccess = function (event) {
  //code here
  console.log("database opened successfully");
  DB1 = HomeGetDB.result;
};
HomeGetDB.onerror = function (event) {
  // code here
  console.log("Error occurred");
};

function addNewUser(e) {
  // e.preventDefault();
  let newuser = {
    CustomerName: name1.value,
    CustomerEmail: email1.value,
    CustomerPhoneNumber: phone1.value,
    CustomerNIDNumber: card1.value,
    CustomerAddress: address1.value,
  };

  let transaction5 = DB1.transaction(["Customer"], "readwrite");
  let objectStore5 = transaction5.objectStore("Customer");
  let request = objectStore5.add(newuser);
  request.onsuccess = () => {};
  transaction5.oncomplete = () => {
    console.log("New appointment added");
  };
  transaction5.onerror = () => {
    console.log("There was an error, try again!");
  };
  window.location.href = "succses.html";
}
