class FallingParticles{
    constructor(way){
        this.img = new Image();
        this.img.src = "images\\particles\\"+way;

        this.y = 0;
        this.x = 0;
        this.dx = 10;
        this.dy = 10;
        this.xway = "random";//left, right, random, chaos
        
        this.spawnSpeed = 30;
        this.concentrated = 0;

        this.size = 1;



        this.tickInterval = 3;
        this.tick = 0;
    }

    move(){
        this.tick++;
        if(this.tick%this.tickInterval==0){
            this.y+=this.dy;
            switch(this.xway){
                case "chaos":
                    this.x+=this.dx-2*randint(this.dx);
                    break;
                case "random":
                    this.xway=["left", "right"][randint(2)];
                    break;
                case "left":
                    this.x-=this.dx;
                    break;
                case "right":
                    this.x+=this.dx;
                    break;
            }
            if((this.y>=particleCanvas.height)||(this.x>=particleCanvas.width)||(this.x<-this.img.width*this.size)){
                return 1;
            }
            
        }
        return 0;
    }


}

var head  = new FallingParticles("Aiko.png");
head.size = 0.3;