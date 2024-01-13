 
//TO-DO: add cycle for auto timer
// focus -> short [4 times]
// focus -> long [1 times]

//button stuff for pomodoro
let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");

let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");

let startBtn = document.getElementById("start");
let reset = document.getElementById("restart");
let pause = document.getElementById("pause");


//auto mode: cycle stuff
let currentCycle = 0;
let totalCycle = 4;

//icon toggle stuff
const CircleCycle = document.querySelectorAll(".circle");

let time = document.getElementById("time");

let set;

let active = "default";

let count = 0;

let paused = true;

//set min_count = focus time first
let minCount = parseInt(document.querySelector('.focusbtn .num').innerText);

//set default time
let focus_mincount =  parseInt(document.querySelector('.focusbtn .num').innerText);
let short_mincount =  parseInt(document.querySelector('.shortBreakbtn .num').innerText);
let long_mincount =  parseInt(document.querySelector('.longBreakbtn .num').innerText);

//display the time
time.textContent= `${focus_mincount}:00`;




//TIME SETTING UPDATING IN POMODORO
document.addEventListener('timeSettingChange',handleTimeSettingsChange)


function handleTimeSettingsChange(){

    // console.log("my focus time setting", focusTimer_setting)
    updateFocusTime();
    updateShortBreakTime();
    updateLongBreakTime();
}

//Listen for custom event


function updateFocusTime(){
    focus_mincount = parseInt(document.querySelector('.focusbtn .num').innerText);
    pauseTimer();

    if (active === 'default'){
        time.textContent= `${focus_mincount}:00`;
        minCount = parseInt(document.querySelector('.focusbtn .num').innerText);
    }
    // time.textContent= `${focus_mincount}:00`;
    // minCount = parseInt(document.querySelector('.focusbtn .num').innerText);
    return focus_mincount;
}

function updateShortBreakTime(){
    short_mincount = parseInt(document.querySelector('.shortBreakbtn .num').innerText);
    pauseTimer();

    if (active === 'short'){
        time.textContent= `${short_mincount}:00`;
        minCount = parseInt(document.querySelector('.shortBreakbtn .num').innerText);
    }
    return short_mincount;
}

function updateLongBreakTime(){
    long_mincount = parseInt(document.querySelector('.longBreakbtn .num').innerText);
    pauseTimer();

    if (active === 'long'){
        time.textContent= `${long_mincount}:00`;
        minCount = parseInt(document.querySelector('.longBreakbtn .num').innerText);
    }
    
    return long_mincount;
}

//add 0 to the value less than 10
const appendZero = (value) => {
    value = value < 10? `0${Math.max(0,value)}`:value;
    return value;
};

//restart function
reset.addEventListener ("click",(
    resetTime = () =>{
        pauseTimer();
        switch(active){
            case "long":
                minCount=updateLongBreakTime();
                break;
            case "short":
                minCount=updateShortBreakTime();
                break;
            default:
                // minCount=focus_mincount;
                //update mincount = focustime change in setting
                minCount= updateFocusTime();
                break;
        }

        //reset the time
        count = 0;
        time.textContent = `${minCount}:00`;
        document.dispatchEvent(new Event('BtnClicked'));
    })
);

const removeFocus = () => {
    buttons.forEach((btn)=>{
       btn.classList.remove("btn-focus"); 
    });
};

focusButton.addEventListener("click",()=> {
    active="default"
    removeFocus();
    focusButton.classList.add("btn-focus");
    pauseTimer();
    minCount = updateFocusTime();
    count = 0;
    time.textContent= `${appendZero(minCount)}:00`;
    document.dispatchEvent(new Event('BtnClicked'));
});


//change to short break [5 mins]
shortBreakButton.addEventListener("click",()=>{
    active="short"
    removeFocus();
    shortBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = updateShortBreakTime();
    count = 0;
    time.textContent = `${appendZero(minCount)}:00`
    document.dispatchEvent(new Event('BtnClicked'));
});

//change to long break [15 mins]
longBreakButton.addEventListener("click",()=>{
    active="long"
    removeFocus();
    longBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = updateLongBreakTime();
    count = 0;
    time.textContent = `${(minCount)}:00`;
    document.dispatchEvent(new Event('BtnClicked'));
});

//click pause button
pause.addEventListener("click",(pauseTimer = () =>{
    paused = true;
    clearInterval(set);

    //hide start button
    startBtn.classList.remove("hide");

    //show pause and restart
    pause.classList.remove("show");
    reset.classList.remove("show");
    document.dispatchEvent(new Event('BtnClicked'));

}
));


//click start button
start.addEventListener("click",() =>{
    //show reset and pause
    reset.classList.add("show");
    pause.classList.add("show");
    
    //hide start button
    startBtn.classList.add("hide");
    startBtn.classList.remove("show");
    document.dispatchEvent(new Event('BtnClicked'));

    if(paused){
        // console.log("my count: ",count)
        // console.log("my mincount: ",minCount)
        paused = false;

        set = setInterval(() => {

            if (count <= 0){
                if(minCount != 0){
                    minCount--;
                    count=59;
                }

                else{
                    clearInterval(set);

                    if (active === 'default'){
                        //the cycle will increase even it auto or not
                        //cycle  === icon
                        // console.log("focus done, the prev cycle ", currentCycle)
                        currentCycle++;
                        Circletoggle();

                        // console.log("my cycle++: ", currentCycle)
                    }
                    // console.log('my automode: ',autoModeActive)
                    // console.log('my active1: ',active)
                    autoMode();
                }
            }

            //add event listern for break end
            if (count === 4){
                console.log("my seconds is: ",count)
                document.dispatchEvent(new Event('BreakEnd_sound'));
            }

            time.textContent=`${appendZero(minCount)}:${appendZero(count)}`
            count--;
        },1000);
    }
});

//AUTO MODE CHECK BOX AND AUTO MODE FUNCTION
let autoModeCheckBox = document.getElementById("auto-checkbox");
let autoModeActive = false;


//toggle AUTOBOX
autoModeCheckBox.addEventListener("change", function(){
    if(autoModeCheckBox.checked){
        // console.log("the auto box is ON. CHECKED")
        autoModeActive = true;
    }

    else{
        // console.log("the auto box is OFF, UNCHECKED")
        autoModeActive = false;
    }

    document.dispatchEvent(new Event('BtnClicked'));
})

console.log("my active: ", active)
console.log('my automode: ',autoModeActive)

function autoMode(){
    
    if (autoModeActive){
        if (active === 'default'){
            focus_to_shortbreak();
        }
    
        else if(active === 'short' && currentCycle != totalCycle){
           
            shortbreak_to_focus();
        }
        else if (active === 'short' && currentCycle === totalCycle){
            resetCircletoggle();
            shortbreak_to_longbreak();
        }
        else if (active === 'long' || currentCycle === 0){
            longbreak_to_focus();
        }
    }

    else{
        console.log("the auto mode is OFF")
    }

    console.log("current cycle: ", currentCycle)
}

//AUTO MODE FUNCITON TIME

//activate shortbreak()
function focus_to_shortbreak(){
    // console.log("it went here, focus to short break")
    active = 'short';
    shortBreakButton.click();
    start.click();
    // currentCycle++; //icon++
}


//active focus
function shortbreak_to_focus(){
    active="default"
    focusButton.click();
    start.click();
}

//active longbreak
function shortbreak_to_longbreak(){
    active = 'long'
    longBreakButton.click();
    currentCycle = 0;
    console.log('shortbreak to longbreak')
    start.click();
    resetCircletoggle();
}

//active focus
function longbreak_to_focus(){
    active="default"
    focusButton.click();
    start.click();
}

function Circletoggle(){
    console.log("my circle: ", CircleCycle)
    CircleCycle[currentCycle-1].classList.toggle('checked');
}

function resetCircletoggle(){

    if (currentCycle === totalCycle){
        setTimeout(() => {
            CircleCycle.forEach(circle =>{
                circle.classList.remove('checked')
            })
        },3000);
        console.log("RESET THE ICON TOGGLE")
        currentCycle = 0; //reset the cycle, already but just to make sure
    }
    
}

