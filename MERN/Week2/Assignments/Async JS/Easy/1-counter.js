// Create a counter in JavaScript

// We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
// It should go up as time goes by in intervals of 1 second

//task 1

let counter = 0;

setInterval(function()
{
    counter += 1;
    console.log(counter);
    if(counter == 15){
        clearInterval(this);
    }
} , 1000);