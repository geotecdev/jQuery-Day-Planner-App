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
let textAreas = [];
let plannerData = [];

window.onload = function() {

    //set js moment variables
    startTime = moment();
    currentTime = moment();

    //grab elements
    currentDayEl = document.querySelector("#currentDay");
    currentTimeEl = document.querySelector("#currentTime");
    timeBlockEls = document.querySelectorAll(".time-block");
    timeBlockBtns = document.querySelectorAll(".saveBtn");
    textAreas = document.querySelectorAll(".time-block textarea")

    //add event listeners to saveBtns
    for (let i = 0; i < timeBlockBtns.length; i++) {
        console.log(i);
        timeBlockBtns[i].addEventListener("click", function() {
            let selectedTextArea = this.previousElementSibling;
            if (selectedTextArea != null) {

                //edit logic
                if (selectedTextArea.disabled === true) {
                    selectedTextArea.disabled = false;
                    selectedTextArea.focus();
                    selectedTextArea.select();
                }

                //save logic
                else
                {
                    selectedTextArea.disabled = true;
                    let taNumber = parseInt(selectedTextArea.getAttribute("value"));
                    plannerData[taNumber - 8].memo = selectedTextArea.value;
                    alert(plannerData[taNumber - 8].hour + ";" + plannerData[taNumber - 8].memo);
                    localStorage.setItem("plannerData", JSON.stringify(plannerData));
                    
                    alert("current edits to planner note saved");
                }
                
            }
        });
    }

    //get plannerData objects from local storage if they exist
    let dataStr = localStorage.getItem("plannerData");
    plannerData = JSON.parse(dataStr);

    //create an indexed list of blank objects and save to ls if not
    if (plannerData === null)
    {
        plannerData = [];
        for (let i = 8; i < 21; i++) {
            plannerData.push({
                "hour": i,
                "memo": ""
            });
        }

        localStorage.setItem("plannerData", JSON.stringify(plannerData));
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

        //set memo from local storage
        let plannerDataObj = plannerData[blockValue - 8];
        let ta = textAreas[blockValue - 8];
        ta.textContent = plannerDataObj.memo;

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