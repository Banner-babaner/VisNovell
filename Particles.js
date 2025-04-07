class FallingParticles{
    constructor(way){
        this.img = new Image();
        this.img.src = "images\\particles\\"+way;

        this.y = 0;
        this.x = 0;
        this.dx = 1;
        this.dy = 0;
        
        this.concentration = 1;

        this.rotation = 0;
        this.rotationWay = "clock";
    }

    move(){
        this.y+=this.dy;
        this.x+=this.dx-randint(this.dx);
        if((this.y>=particleCanvas.height)||(this.x>=particleCanvas.height)||(this.x-this.img.width<0)){
            return 1;
        }
        return 0;
    }

}

var head  = new FallingParticles("Aiko.png");