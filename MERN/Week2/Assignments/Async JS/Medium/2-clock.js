// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

function updateClock() {
    let time = new Date();

    let hours24 = time.getHours(); 
    let minutes = String(time.getMinutes()).padStart(2, '0');
    let seconds = String(time.getSeconds()).padStart(2, '0');


    let clock24 = `${String(hours24).padStart(2, '0')}:${minutes}:${seconds}`;
    
    let hours12 = hours24 % 12 || 12; 
    let period = hours24 >= 12 ? "PM" : "AM";
    let clock12 = `${String(hours12).padStart(2, '0')}:${minutes}:${seconds} ${period}`;

    console.log("24-hour format:", clock24);
    console.log("12-hour format:", clock12);
}

setInterval(updateClock, 1000);

updateClock();
