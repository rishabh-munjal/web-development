const start = document.getElementById('s');
const reset = document.getElementById('r');

let intervalId = null;  
let count = 0;

start.addEventListener('click', function (e) {
    var timer = document.querySelector('h1');

    if (intervalId === null) {
        intervalId = setInterval(function () {
            timer.innerHTML = `${count}`;
            count++;
        }, 1000);
    }
});

reset.addEventListener('click', function (e) {
    var timer = document.querySelector('h1');

    clearInterval(intervalId);
    intervalId = null;
    count = 0;
    timer.innerHTML = `${count}`;
});
