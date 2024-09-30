const button1 = document.querySelector('#b1');
const button2 = document.querySelector('#b2');
const button3 = document.querySelector('#b3');
const button4 = document.querySelector('#b4');
const button5 = document.querySelector('#b5');
const button6 = document.querySelector('#b6');

var div1 = document.querySelector('#tab1');
var div2 = document.querySelector('#tab2');
var div3 = document.querySelector('#tab3');
var div4 = document.querySelector('#tab4');
var div5 = document.querySelector('#tab5');
var div6 = document.querySelector('#tab6');

div1.style.display = "block";

// Function to hide all images
function hideAll() {
    div1.style.display = "none";
    div2.style.display = "none";
    div3.style.display = "none";
    div4.style.display = "none";
    div5.style.display = "none";
    div6.style.display = "none";
}

// Show the image when the corresponding button is clicked
button1.addEventListener('click', function() {
    hideAll();
    div1.style.display = "block";
});

button2.addEventListener('click', function() {
    hideAll();
    div2.style.display = "block";
});

button3.addEventListener('click', function() {
    hideAll();
    div3.style.display = "block";
});

button4.addEventListener('click', function() {
    hideAll();
    div4.style.display = "block";
});

button5.addEventListener('click', function() {
    hideAll();
    div5.style.display = "block";
});

button6.addEventListener('click', function() {
    hideAll();
    div6.style.display = "block";
});
