const myButton = document.querySelector(".my-button");
const myCircles = document.querySelectorAll(".circle");
const mySettingBtn = document.querySelector(".setting-btn");
const settingContainer = document.querySelector(".setting-container");

let currentIndex = 0; // Keep track of the currently selected dot
let cycle = 4;


//SETTING FUNCTION 
mySettingBtn.addEventListener("click",() =>{
    settingContainer.classList.toggle("active");
    document.dispatchEvent(new Event('BtnClicked'));
});


//ADJUST TIME FUNCTION [decrease and increase]

// Function to handle increment and decrement
function handleIncrementDecrement(buttonClass, maxValue = Infinity, minValue = 0) {
    const numElement = document.querySelector(`.${buttonClass} .num`);
    const plusBtn = document.querySelector(`.${buttonClass} .plus`);
    const minusBtn = document.querySelector(`.${buttonClass} .minus`);

    // Default value
    let value = parseInt(numElement.innerText);
    value = (value < 10) ? "0" + value : value;
    numElement.innerHTML = value;

    plusBtn.addEventListener("click", () => {
        value++;
        value = (value > maxValue) ? minValue : value;
        updateValue();
    });

    minusBtn.addEventListener("click", () => {
        value--;
        value = (value < minValue) ? maxValue : value;
        updateValue();
    });

    function updateValue() {
        value = (value < 10) ? "0" + value : value;
        numElement.innerHTML = value;

        //Dispatch the custom event when teh value is update
        // console.log(timeSettingsChangeEvent)
        document.dispatchEvent(new Event('timeSettingChange'));
    }
};

// Apply the function to each button with different purposes
handleIncrementDecrement("focusbtn", 60, 0);
handleIncrementDecrement("shortBreakbtn", 60, 0);
handleIncrementDecrement("longBreakbtn", 60, 0);

//ICON CHECKBOX FUNCTION
const iconCheckbox = document.getElementById("icon-checkbox")

//check if the checked is checked
iconCheckbox.addEventListener("change",()=>{
    //local variable
    const container = document.querySelector(".container")
    const dot_container = document.querySelector(".dot-container")

    if (iconCheckbox.checked){
        //checked, toggle the hide function
        container.classList.toggle('hide-icon')
        dot_container.classList.toggle('hide-icon')
    }

    else{
        //checked, toggle it again
        container.classList.toggle('hide-icon')
        dot_container.classList.toggle('hide-icon')
    }

    document.dispatchEvent(new Event('BtnClicked'));

})

//MUSIC FUNCTION

import songs from './songs.js';

console.log(songs);

let playing = false,
    currentSong = 0,
    audio = new Audio();


const playlistContainer = document.querySelector("#playlist");

function init(){
    updatePlaylist(songs);
    
    loadSong(currentSong);
};

init();

function updatePlaylist(songs){
    playlistContainer.innerHTML = "";

    songs.forEach((song, index) =>{
        //extract data from song
        const{title,src} = song;

        //create a tr to wrapper songs

        const tr = document.createElement("tr");
        tr.classList.add("song");

        tr.innerHTML = `
        <tr class="song">
            <td class="no">
                <h5>${index + 1}</h5>
            </td>
            <td class="title">
                <h6>${title}</h6>
            </td>
         </tr>
        `;
    playlistContainer.appendChild(tr);
    
    //play song when clicked on playlist songs
    tr.addEventListener("click",(e)=>{
        
        currentSong = index;
        //remove all the active state for all tr
        document.querySelectorAll(".list tr").forEach((element) =>{
            element.classList.remove("active");
        })

         // add the "active" class to the clicked tr [current songs]
         tr.classList.add("active");


        loadSong(currentSong);
        audio.play();
        console.log(currentSong,currentIndex)
        playPauseBtn.classList.replace("fa-play","fa-pause");
        playing = true;

    });
    });
}

function loadSong(num){
    // audio.src = `animal_crossing_music/${songs[num].src}`
    audio.src = songs[num].src;

}

//control btn
const playPauseBtn = document.querySelector("#playpause"),
    nextBtn = document.querySelector("#next"),
    prevBtn = document.querySelector("#prev");


    playPauseBtn.addEventListener("click",()=>{

        //remove all the active state for all tr
        document.querySelectorAll(".list tr").forEach((element) =>{
            element.classList.remove("active");
        })

        if (playing){
            //pause if already playing
            playPauseBtn.classList.replace("fa-pause","fa-play");
            playing = false;
            audio.pause();
        }

        else{
            //if not plauying play
            playPauseBtn.classList.replace("fa-play","fa-pause");
            playing = true;
            audio.play();
        }

        //active the current songs
        document.querySelectorAll(".list tr")[currentSong].classList.add("active");
    })

function nextSong(){

    //remove all the active state for all tr
    document.querySelectorAll(".list tr").forEach((element) =>{
        element.classList.remove("active");
    })

    //if current song is not last in playtlist, play next song
    if (currentSong < songs.length -1){
        //load the next song
        currentSong++;
    }

    else{
        //if its last song then play first
        currentSong = 0;
    }

    //active the current songs
    document.querySelectorAll(".list tr")[currentSong].classList.add("active");


    loadSong(currentSong);
    
    

    if(playing){
        audio.play();
    }

    scrollToCurrentSong();
}
nextBtn.addEventListener("click", nextSong);

function prevSong(){
    //remove all the active state for all tr
    document.querySelectorAll(".list tr").forEach((element) =>{
        element.classList.remove("active");
    })

    //if not first song is playing, go to the prev song
    if (currentSong > 0){
        //load the prev song
        currentSong--;
    }

    else{
        //if the first song, then go to the last song
        currentSong = songs.length-1;
    }

    //active the current songs
    document.querySelectorAll(".list tr")[currentSong].classList.add("active");
    loadSong(currentSong);

    if(playing){
        audio.play();
    }

    scrollToCurrentSong();
}

prevBtn.addEventListener("click", prevSong);

//go to next song if ended

audio.addEventListener("ended",()=>{
    nextSong();
    audio.play;
})


//Volume Adjustment

const volumeSlider = document.getElementById('volumeSlider');
const volumeValueDisplay = document.querySelector('.music-slider-value');
const volumeIcon = document.querySelector('#VolumeIcon')

volumeSlider.addEventListener('input',()=>{
    const value = volumeSlider.value;

    volumeValueDisplay.textContent = value;

    audio.volume = value/100

    //change the volume icon based on the volume value
    if (value > 50){
        volumeIcon.classList = 'fa-solid fa-volume-high'
    }

    else if (value > 0){
        volumeIcon.classList = 'fa-solid fa-volume-low'
    }

    else{
        volumeIcon.classList = 'fa-solid fa-volume-xmark'
    }   
})

//SCROLL BAR BEHAVIOR FOLLOW THE CURRENT SONG
function scrollToCurrentSong(){
    const currentPlaylistItem = document.querySelectorAll(".list tr")[currentSong];
    currentPlaylistItem.scrollIntoView({behavior: "smooth",block:'nearest'});
}
