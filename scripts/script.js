
//on load function equivilant
//interval timer to keep running total of time. runs until user exits page
//> updates time value in header 
//> determines time triggered ui changes

// main function with interval
//{

    //set currentTime value

    //if currentTime is hr:00 {
        //
    //}

    //if currentTime is hr:[even minute] {
        //
    //}

//}

let timer;
let timerCount = 0;
let startTime;
let currentTime;
let activeHour;
let currentDayEl;
let currentTimeEl;

window.onload = function() {

    startTime = moment();
    currentTime = moment();
    currentDayEl = document.querySelector("#currentDay");
    currentTimeEl = document.querySelector("#currentTime");
    startPlannerTime();
}

function startPlannerTime() {
    timer = setInterval(function() {
        timerCount++;
        currentTime.add(1, "seconds");

        //update live timer in header
        currentDayEl.textContent = currentTime.format("MM/DD/YYYY");
        currentTimeEl.textContent = currentTime.format("hh:mm:ss A");

        //if currentTime is hr:00:00, updateHour
        if (currentTime.get("minutes") === 2 && currentTime.get("seconds") === 0) {
            console.log("new hour!");
        }

        //if currentTime is hr:[second is divisible by 5], move needle
        if (currentTime.get("seconds") % 5 === 0) {
            console.log(currentTime.toISOString());
        }

    }, 1000)};