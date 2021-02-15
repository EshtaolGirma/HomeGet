var a = document.querySelector('#full_name');
var b = document.querySelector('#email_address');
var c = document.querySelector('#user_name');
var d = document.querySelector('#present_address');
var e = document.querySelector('#card_number');
var f = document.querySelector('#phone_number');
function validform() {

    if ( a.value==="")
    {
        alert("Please Enter Your full name");
        return;
    }
    else if (b.value==null || b.value==="")
    {
        alert("Please Enter Your Email Address");
        return false;
    }else if (c.value==null || c.value=="")
    {
        alert("Please Enter Your Username");
        return false;
    }else if (d.value==null || d.value=="")
    {
        alert("Please Enter Your Permanent Address");
        return false;
    }else if (e.value==null || e.value=="")
    {
        alert("Please Enter Your card Number");
        return false;
    }else if (f.value==null || f.value=="")
    {
        alert("Please Enter Your phone Number");
        return false;
    }

}