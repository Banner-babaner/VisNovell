const main = document.getElementById("main");
const mainMenu = document.getElementById("main_menu");
const gameMenu = document.getElementById("game_menu"); 
const gameCanvas = document.getElementById("game_canvas"); 
const particleCanvas = document.getElementById("particle_canvas");
const textWindow = document.getElementById("writter");
const namer = document.getElementById("nameplace");
const writter = document.getElementById("textplace");

const gcCtx = gameCanvas.getContext("2d");
const pcCtx = particleCanvas.getContext("2d");

const screenBtn = document.getElementById("screenBtn");
const settingsReturnBtn = document.getElementById("settings_return");
const startBtn = document.getElementById("startBtn");
const aboutGameBtn = document.getElementById("aboutGameBtn");

var fullscreen = false;
var activated_GM = false;
var started = false;


//images
var logo = new Image();
logo.src = "images/scenes/School/Athletics Track Day.png";

function changeScreenSize(){
    if(fullscreen&&(document.fullscreenElement)){
        document.exitFullscreen();
        screenBtn.innerHTML = "На весь экран";
        fullscreen = false;
    }
    else{
        main.requestFullscreen();
        screenBtn.innerHTML = "Режим окна";
        fullscreen = true;
    }
}


function changeGM(){
    if(activated_GM){
        gameMenu.style.display = "none";
        activated_GM = false;
    }
    else{
        gameMenu.style.display = "unset";
        activated_GM = true;
    }
}






function startGame(){
    settingsReturnBtn.onclick = changeGM;
    started = true;
    mainMenu.style.display = "none";
    gameCanvas.style.display = "block";
    scene(logo);
    renderMaster.start();
    // renderMaster.showSprite(Aiko, "center");  
    textWindow.style.display="unset";
    renderMaster.showCharacter(AikoChar, "cute_speaking");
    AikoChar.say("Mew Mew Mew");
    renderMaster.particlesList.push(head);

}


window.onload = ()=>{
    window.onkeydown = (event)=>{
        switch(event.key){
            case "c":
            case "C":
            case "с":
            case "С":
                changeScreenSize();
                break;
            case "x":
            case "X":
            case "ч":
            case "Ч":
                if(started){
                    changeGM();
                }
                break;
            case "Escape":
                if(fullscreen) changeScreenSize();
                if(activated_GM) changeGM();
                break;
        }
    }
    screenBtn.onclick = changeScreenSize;
    startBtn.onclick = startGame;
}

function randint(end){
    let res = Math.floor(Math.random()*end);
    return res;
}