/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

async function sleepAsync(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

console.log("Start");
sleepAsync(3000).then(() => console.log("End after 3 seconds"));
