var speekSpeed = 25;


class Sprite{
    constructor(nameList, way=""){
        this.skins = new Array();

        for(let i=0; i<nameList.length; i++){
            let img = new Image();
            img.src = way+nameList[i];
            this.skins.push(img);
        }

        this.x=0;
        this.y=this.skins[0].height;

        this.state=0;
        this.tickInterval=100;
        this.tickCount=0;
    }

    getSkin(){
        if(this.tickCount%this.tickInterval==0){
            this.state=(this.state+1)%this.skins.length;
        }
        this.tickCount++;

        return this.skins[this.state];

    }

    reset(){
        this.tickCount=0;
        this.state=0;
    }
}

class Character{
    constructor(name, spritesDict){
        this.name = name;
        this.spritesDict = spritesDict;
        this.nameList = new Array();
        for(let key in spritesDict){
            this.nameList.push(key);
        }

        this.state=spritesDict[this.nameList[0]];

    }

    say(string, speed=speekSpeed){
        writter.innerHTML = "";
        namer.innerHTML = this.name;

        for(let i=0; i<string.length; i++){
            setTimeout(
                ()=>{
                    writter.innerHTML += string[i];
                },
                1000/speed*i
            );
            
        }
    }
}



var Aiko = new Sprite([
    "Aiko_Blazer_Closed_Frown_Blush.png",
    "Aiko_Blazer_Closed_Open_Blush.png",
],
"images\\sprites\\Aiko\\Blazer Uniform\\"
);
Aiko.tickInterval=7;

var AikoChar = new Character("Aiko", {
    "cute_speaking": Aiko
})