class coins {
    constructor(x, y) {
        this.yYellowCoin = y - 170;
        this.yBlueCoin = y - 170;

        this.x = x;
        this.y = this.yYellowCoin;
        this.width = 40;
        this.height = 45;

        this.imgYellowCoin = null;
        this.imgBlueCoin = null;
    }
    loadImageYellowCoin() {
        this.imgYellowCoin = new Image;
        this.imgYellowCoin.src = "images/yellowCoin.png";
    }
    loadImageBlueCoin() {
        this.imgBlueCoin = new Image;
        this.imgBlueCoin.src = "images/blueCoin.png";
    }
}