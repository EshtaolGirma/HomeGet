var a = document.querySelector('#full_name');
var b = document.querySelector('#email_address');
var d = document.querySelector('#present_address');
var e = document.querySelector('#password');
var f = document.querySelector('#phone_number');
var registerBtn = document.querySelector("#regbtn");
var emailtest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var phonenumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
var passwordvd =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
function validform() {
  if (a.value === "") {
    alert("Please Enter Your full name");
    return;
  } else if (b.value == null || b.value === "") {
    alert("Please Enter Your Email Address");
    return false;
  } else if (e.value == null || e.value == "") {
    alert("Please Enter Your password");
    return false;
  } else if (f.value == null || f.value == "") {
    alert("Please Enter Your phone Number");
    return false;
  } else if (e.value.match(passwordvd)) {
    alert("invalid password");
    return true;
  } else if (b.value.match(emailtest)) {
    // alert("You have entered an invalid email address!");
    return true;
  } else if (f.value.match(phonenumber)) {
    alert("please enter phone correctly");
    return true;
  }
}
 

function registering() {
  if (validform() == true) {
    addNewUser();
  }
}



function registering(){
    if (validFrom() == false) {
        addNewUser();
    }
 
}

registerBtn.addEventListener("click", registering);
