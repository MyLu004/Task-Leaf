
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const amountTask = document.getElementById("amountTask");
const progressBar = document.querySelector(".filling")

const wasChecked = false; //variable to track if a task was just checked

function handleKeyDown(event){
    if (event.key === "Enter"){
        addTask();
    }
}

function addTask(){
    //check if the input box empty or not
    if(inputBox.value === ''){
        alert("please enter something")
    }

    else{
        //create the list [li] task
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
        updateTaskCount();
        updateProgressBar();

        //scroll to the end of the list
        listContainer.scrollTop= listContainer.scrollHeight;

        //add event lister for adding task for sound effect
    }

    //reset the add box value
    inputBox.value = "";
}

function updateTaskCount(){
    const totalTasks = document.querySelectorAll("#list-container li").length;
    const checkTasks = document.querySelectorAll("#list-container li.checked").length;

    amountTask.textContent = `${checkTasks}/${totalTasks}`;
}

function updateProgressBar(){
    const totalTasks = document.querySelectorAll("#list-container li").length;
    const checkTasks = document.querySelectorAll("#list-container li.checked").length;

    const progressBarPercentage = totalTasks > 0 ? (checkTasks / totalTasks) *100 : 0;
    progressBar.style.width = `${progressBarPercentage}%`
}


listContainer.addEventListener("click", function(e){
    //checked task -> click circle to checked task
    if(e.target.tagName === "LI"){

        //if checked, then play sound
        if (e.target.classList.toggle("checked")){
            document.dispatchEvent(new Event('CompleteTask'));
        }

        if (areAllTasksComplete()){
            document.dispatchEvent(new Event('CompleteAll'));
        }

        saveData();
        updateTaskCount();
        updateProgressBar();
    }

    //remove task -> click btn remove x
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateTaskCount();
        updateProgressBar();
    }
},false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    updateTaskCount();
    updateProgressBar();

    //scroll to the end of the list
    listContainer.scrollTop= listContainer.scrollHeight;
}

showTask();

//function to check if all tasks are completed
function areAllTasksComplete(){
    const totalTasks = document.querySelectorAll("#list-container li").length;
    const checkTasks = document.querySelectorAll("#list-container li.checked").length;

    return totalTasks > 0 && checkTasks === totalTasks;
}