



function scene(img){
    gameCanvas.style.backgroundImage = `url("${img.src}")`;
    gameCanvas.style.backgroundSize = `${100*img.width/gameCanvas.width}% ${100*img.height/gameCanvas.height}%`;
}


class RenderMaster{
    constructor(){
        this.mainSpriteList = new Array();
        this.particlesList = new Array();

        this.particlesField = new Array();

    }

    showSprite(sprite, pos="center"){
        let index = this.mainSpriteList.indexOf(sprite);
        if(index>-1){
            this.mainSpriteList = this.mainSpriteList.splice(index, 1);
        }
        sprite.reset();
        switch(pos){
            case "center":
                sprite.x = gameCanvas.width/2-sprite.skins[sprite.state].width/2;
                sprite.y = gameCanvas.height-sprite.skins[sprite.state].height;
                break;

            case "left":
                sprite.x = 0;
                sprite.y = gameCanvas.height-sprite.skins[sprite.state].height;
                break;
            case "right":
                sprite.x = gameCanvas.width-sprite.skins[sprite.state].width;
                sprite.y = gameCanvas.height-sprite.skins[sprite.state].height;
                break;
            case "top":
            case "top-center":
                sprite.x = gameCanvas.width/2-sprite.skins[sprite.state].width/2;
                sprite.y = 0;
                break;
            case "top-left":
                sprite.x = 0;
                sprite.y = 0;
                break;
            case "top-right":
                sprite.x = gameCanvas.width-sprite.skins[sprite.state].width;
                sprite.y = 0;
                break;
        }
        this.mainSpriteList.push(sprite);
    }

    showCharacter(character, state=false, pos="center"){
        if(state){
            this.showSprite(character.spritesDict[state], pos);
        }
        else{
            this.showSprite(character.state, pos);
        }

    }

    showParticles(){
        let toDelete = new Array();
        this.particlesField.forEach(element => {
            if(element.move()){
                toDelete.push(element);
            }
        });
        for(let i=0; i<this.particlesField.length; i++){

        }

        for(let i=0; i<toDelete.length; i++){
            let index = this.particlesField.indexOf(toDelete[i]);
            console.log(index);
            this.particlesField.splice(index, 1);
        }

        this.particlesList.forEach(element => {
            element.concentrated++;
            if(element.concentrated==element.spawnSpeed){
                element.concentrated=0;
                let newPrt = Object.assign({}, element);
                newPrt.x = randint(particleCanvas.width-element.img.width);
                newPrt.move = element.move;
                this.particlesField.push(newPrt);
            }

        });


        this.particlesField.forEach(element => {
            pcCtx.drawImage(element.img, 0, 0, element.img.width, element.img.height, element.x, element.y, element.img.width*element.size, element.img.height*element.size);

        });

    }

    render(){
        gcCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        pcCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        for(let i=0; i<this.mainSpriteList.length; i++){//Отрисовка всех спрайтов
            gcCtx.drawImage(this.mainSpriteList[i].getSkin(), this.mainSpriteList[i].x, this.mainSpriteList[i].y);
        }
        //Отрисовка частиц
        this.showParticles();
    }

    start(){
        this.render();
        let loop = ()=>{
            this.render();
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }
}


var renderMaster = new RenderMaster();