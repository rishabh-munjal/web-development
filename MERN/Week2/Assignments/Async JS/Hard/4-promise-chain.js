/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
    return new Promise(function(resolve) {
        setTimeout(resolve, 1000);
    });
}

function waitTwoSeconds() {
    return new Promise(function(resolve) {
        setTimeout(resolve, 2000);
    });
}

function waitThreeSeconds() {
    return new Promise(function(resolve) {
        setTimeout(resolve, 3000);
    });
}

async function sequentialWait() {
    const start = Date.now(); // Start time

    await waitOneSecond();
    await waitTwoSeconds();
    await waitThreeSeconds();

    const end = Date.now(); // End time
    const timeTaken = (end - start) / 1000; // Convert to seconds
    console.log("Sequential promises completed in " + timeTaken + " seconds");
}
sequentialWait();