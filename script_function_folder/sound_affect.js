
let myVolume = 0.05;

const soundBtn = document.getElementById('sound-checkbox');

//SOUND EFFECT BTN FUNCTION
soundBtn.addEventListener("change",() =>{
    if (soundBtn.checked){
        BtnSoundAffect();
        myVolume = 0;
    }
    else{
        myVolume = 0.2;
        BtnSoundAffect();
        
    }
});


//EVENT LISTERN HERE
document.addEventListener('BtnClicked',function(){
    BtnSoundAffect();
});

document.addEventListener('BreakEnd_sound',function(){
    BreakEndEffect();
})

document.addEventListener('CompleteTask',function(){
    CompleteTask();
})

document.addEventListener('CompleteAll',function(){
    AllDone();
})


//FUNCTION PLAYING SOUND

//BtnClicked Sound
function BtnSoundAffect(){
    // console.log("event checking")
    playsound_affect('plastic-bubble-click.wav', myVolume);
}


//BREAK-END Sound
function BreakEndEffect(){
    playsound_affect('BreakEnd.mp3',myVolume)
}

//ADDING TASK Sound
function CompleteTask(){
    playsound_affect('addTask_sound.mp3',myVolume)
}

//COMPLETE ALL TASK Sound
function AllDone(){
    playsound_affect('complete_all_task.mp3',myVolume)
}

//PLAYSOUND_FUNCTION 
function playsound_affect(url, volume = 0.2){
    const sound_audio = new Audio(`./animal_crossing_soundaffect/${url}`);
    console.log(sound_audio);
    sound_audio.volume = volume
    sound_audio.play();
}
