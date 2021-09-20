class wolf {
    constructor(y) {
        this.x = 250;
        this.y = y;
        this.width = 100;
        this.height = 120;
        
        this.g = 0.2;
        this.preY = this.y;
        this.jumpDistance = 120;

        this.isJump = false;
        this.jumpDelay = false;
        this.isFall = false;

        this.img_run = null;
        this.img_jump = null;
        this.img_die = null;
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
    jump(difficulty) {
        if (this.preY - this.y < this.jumpDistance && !this.isFall) {
            this.y -= 2;
            return false;
        }
        else {
            this.isFall = true;
        }
        if (this.preY > this.y && this.isFall) {
                this.y += this.g;
                this.g *= (1.05 + difficulty*0.01);
            return false;
        }
        this.y = this.preY;
        return true;
    }
}