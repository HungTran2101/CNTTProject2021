class wolf{
    constructor(skin) {
        this.x = 200;
        this.y = 415;
        this.img_run = null;
        this.img_jump = null;
        this.img_die = null;
        this.width = 100;
        this.height = 120;
        this.loadImg(skin);
    }
    loadImg(skin) {
        this.img_run = new Image;
        this.img_jump = new Image;
        this.img_die = new Image;
        if (skin == 0) {
            this.img_run.src = "images/wolf_run.png"
            this.img_jump.src = "images/wolf_jump.png"
            this.img_die.src = "images/wolf_die.png"
        }
        else if (skin == 1) {
            this.img_run.src = "images/wolf_run1.png"
            this.img_jump.src = "images/wolf_jump1.png"
            this.img_die.src = "images/wolf_die1.png"
        }
        else if (skin == 2) {
            this.img_run.src = "images/wolf_run2.png"
            this.img_jump.src = "images/wolf_jump2.png"
            this.img_die.src = "images/wolf_die2.png"
        }
        else {
            this.img_run.src = "images/wolf_run3.png"
            this.img_jump.src = "images/wolf_jump3.png"
            this.img_die.src = "images/wolf_die3.png"
        }
    }
}