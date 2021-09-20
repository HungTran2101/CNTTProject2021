class obsticals{
    constructor(x, y){
        this.x = x - 200;
        this.y = y;
        this.img = new Image;
    }
    spawn(){
        let x = Math.round(Math.random() * 100);
    }
}