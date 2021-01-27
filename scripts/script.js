
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
let activeBlock;
let timeBlockEls = [];
let timeBlockBtns = [];

window.onload = function() {

    //set js moment variables
    startTime = moment();
    currentTime = moment();

    //grab elements
    currentDayEl = document.querySelector("#currentDay");
    currentTimeEl = document.querySelector("#currentTime");
    timeBlockEls = document.querySelectorAll(".time-block");
    timeBlockBtns = document.querySelectorAll(".saveBtn");

    //add event listeners to saveBtns
    for (let i = 0; i < timeBlockBtns.length; i++) {
        console.log(i);
        timeBlockBtns[i].addEventListener("click", function(btn) {
            console.log(this.getAttribute("value"));
        });
    }

    setTimeBlocks();
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
            setTimeBlocks();
        }

        //if currentTime is hr:[second is divisible by 5], move needle
        if (currentTime.get("seconds") % 5 === 0) {
            //console.log(currentTime.toISOString());
        }

    }, 1000)};

function setTimeBlocks() {
    activeHour = moment().format("HH");
    for (let i = 0; i < timeBlockEls.length; i++) {
        let timeBlockEl = timeBlockEls[i];
        let blockValue = parseInt(timeBlockEl.getAttribute("value"));

        if (blockValue < activeHour) {
            timeBlockEl.classList = "p-2 flex-row time-block past";
        }
        else if (blockValue >= activeHour) {
            timeBlockEl.classList = "p-2 flex-row time-block present";
        }
        
        if (blockValue > activeHour) {
            timeBlockEl.classList = ("p-2 flex-row time-block future");
        }
    }
}

function lockAndSaveTextArea(btn) {

}