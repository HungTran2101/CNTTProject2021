class wolf {
    //khởi tạo cho đối tượng của class
    constructor(x, y) {
        this.x = x * 0.3;
        this.y = y * 0.57;
        this.width = 100;
        this.height = 120;

        this.baseG = -6;
        this.speedG = 0.11;
        this.g = this.baseG;
        this.preY = this.y;
        this.speedBackward = -4;
        this.speedForward = 2;
        this.jumpDistance = 170;

        this.isJump = false;
        this.isMove = false;
        this.jumpDelay = false;
        this.isFall = false;

        this.img_run = null;
        this.img_jump = null;
        this.img_die = null;
    }
    //lựa chọn hình ảnh để load vào nhân vật dựa theo tham số slot
    loadImg(slot) {
        this.img_run = new Image;
        this.img_jump = new Image;
        this.img_die = new Image;
        if (slot == 0) {
            this.img_run.src = "../images/wolf_run.png"
            this.img_jump.src = "../images/wolf_jump.png"
            this.img_die.src = "../images/wolf_die.png"
        }
        else if (slot == 1) {
            this.img_run.src = "../images/wolf_run1.png"
            this.img_jump.src = "../images/wolf_jump1.png"
            this.img_die.src = "../images/wolf_die1.png"
        }
        else if (slot == 2) {
            this.img_run.src = "../images/wolf_run2.png"
            this.img_jump.src = "../images/wolf_jump2.png"
            this.img_die.src = "../images/wolf_die2.png"
        }
        else {
            this.img_run.src = "images/wolf_run3.png"
            this.img_jump.src = "images/wolf_jump3.png"
            this.img_die.src = "images/wolf_die3.png"
        }
    }
    //xử lí khi nhân vật nhảy
    jump() {
        this.y += this.g;
        this.g += this.speedG;
        if(this.y > this.preY){
            this.y = this.preY;
            this.g = this.baseG;
            return true;
        }
        return false;
    }
    //xử lí khi nhân vật qua trái qua phải
    move(direction) {
        this.x += direction;
    }
}