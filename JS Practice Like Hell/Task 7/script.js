const pbar = document.querySelector('.progress-bar')
var count = 0;

var int = setInterval(function(){

    if(count === 100){
        count = 0;
    }

    pbar.style.width = count + '%';
    count++;
} , 100)