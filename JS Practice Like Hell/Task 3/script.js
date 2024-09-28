var form = document.querySelector("form");
var button = document.getElementById('Submit');

var email = document.getElementById('email');
var password = document.getElementById('pass');
var div = document.querySelector('p') 

button.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Validating email
    if (email.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        form.reset(); 
        div.innerHTML = ``;
    } else {
        div.innerHTML = ``;
        div.innerHTML = `Wrong input!!` // Add warning text
    }
});
