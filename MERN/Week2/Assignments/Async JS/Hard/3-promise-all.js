/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */

function waitonesecond(){
    return new Promise(function(resolve){
        setTimeout(resolve , 1000);
    })
}
function waittwosecond(){
    return new Promise(function(resolve){
        setTimeout(resolve , 2000);
    })
}
function waitthreesecond(){
    return new Promise(function(resolve){
        setTimeout(resolve , 3000);
    })
}


function waitall(){
    var start = Date.now(); 

    return Promise.all([waitonesecond(), waittwosecond(), waitthreesecond()])
        .then(function() {
            var end = Date.now(); 
            var timeTaken = (end - start) / 1000; // Convert to seconds
            console.log("All promises resolved in " + timeTaken + " seconds");
        });


}


waitall();