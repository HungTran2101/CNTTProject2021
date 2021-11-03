class coins {
    constructor(x, y) {
        this.yYellowCoin = y + 50;
        this.yBlueCoin = y;
        this.rYellowCoin = 40;
        this.rBlueCoin = 30;
        this.vYellowCoin = 5;
        this.vBlueCoin = 10;

        this.x = x;
        this.y = this.yYellowCoin;
        this.resolution = this.rYellowCoin;
        this.value = this.vYellowCoin;

        this.imgYellowCoin = null;
        this.imgBlueCoin = null;
        this.loadImageYellowCoin();
        this.loadImageBlueCoin();
    }
    loadImageYellowCoin() {
        this.imgYellowCoin = new Image;
        this.imgYellowCoin.src = "../images/yellowCoin.png";
    }
    loadImageBlueCoin() {
        this.imgBlueCoin = new Image;
        this.imgBlueCoin.src = "../images/blueCoin.png";
    }
    move() {
        this.x -= 3;
        if (this.x < -this.resolution) {
            return true;
        }
        return false;
    }
}