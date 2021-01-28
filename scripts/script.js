let timer;
let timerCount = 0;
let startTime;
let currentTime;
let activeHour;
let currentDayEl;
let currentTimeEl;
//let needleEl;
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
    currentDayEl = $("#currentDay");
    currentTimeEl = $("#currentTime");
    timeBlockEls = $(".time-block");
    timeBlockBtns = $(".saveBtn");
    textAreas = $(".time-block textarea");
    //needleEl = document.querySelector(".timeNeedle");

    //add event listeners to saveBtns
    for (let i = 0; i < timeBlockBtns.length; i++) {
        timeBlockBtns[i].addEventListener("click", function() {
            let selectedTextArea = this.previousElementSibling;
            if (selectedTextArea != null) {

                //edit logic
                if (selectedTextArea.disabled === true) {
                    //change button content to save
                    this.textContent = "Save";
                    //enable text area and set cursor
                    selectedTextArea.disabled = false;
                    selectedTextArea.focus();
                    selectedTextArea.select();
                }

                //save logic
                else
                {
                    //disable text area and set memo changes to local storage
                    selectedTextArea.disabled = true;                    
                    let textAreaNumber = parseInt(selectedTextArea.getAttribute("value"));
                    //reset button text to default
                    this.textContent = "Edit";
                    //update memo value of current obj
                    plannerData[textAreaNumber - 8].memo = selectedTextArea.value;
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
        currentDayEl.text(currentTime.format("MM/DD/YYYY"));
        currentTimeEl.text(currentTime.format("hh:mm:ss A"));

        //if currentTime is hr:00:00, updateHour
        if (currentTime.get("minutes") === 0 && currentTime.get("seconds") === 0) {
            setTimeBlocks();
        }

        //if currentTime is hr:[minute is divisible by 5], run periodic time block reset
        if (currentTime.get("minutes") % 5 === 0) {
            setTimeBlocks();
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

        //format bolck based on current time
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