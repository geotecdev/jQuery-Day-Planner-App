
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
let topDivPercent = 0.0;
let btmDivPercent = 0.0;
let needlePositions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
let tdPercents = [0, 8.3, 16.6, 24.9, 33.2, 41.5, 49.8, 58.1, 66.4, 74.7, 83, 91.3, 100];
var bdPercents = [10, 91.7, 83.4, 75.1, 66.8, 58.5, 50.2, 41.9, 33.6, 25.3, 17, 8.5, 0];

window.onload = function() {

    startTime = moment();
    currentTime = moment();
    startPlannerTime();
}

function startPlannerTime() {
    timer = setInterval(function() {
        timerCount++;
        currentTime.add(1, "seconds");

        //update live timer in header


        //if currentTime is hr:00:00, updateHour
        if (currentTime.get("minutes") === 2 && currentTime.get("seconds") === 0) {
            console.log("new hour!");
        }

        //if currentTime is hr:[second is divisible by 5], move needle
        if (currentTime.get("seconds") % 5 === 0) {
            console.log(currentTime.toISOString());
        }

    }, 1000)};