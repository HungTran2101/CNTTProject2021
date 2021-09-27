class obsticals {
    constructor(x, y) {
        this.yBear = y - 30;
        this.yCactus = y;

        this.x = x;
        this.y = this.yCactus;
        this.width = 80;
        this.height = 90;

        this.imgCactus = null;
        this.imgBear = null;
    }
    loadImageCactus(slot) {
        this.imgCactus = new Image;
        switch (slot) {
            case 0: this.imgCactus.src = "images/cactus.png"; break;
            case 1: this.imgCactus.src = "images/cactus1.png"; break;
            case 2: this.imgCactus.src = "images/cactus2.png"; break;
            case 3: this.imgCactus.src = "images/cactus3.png"; break;
        }
    }
    loadImageBear(slot) {
        this.imgBear = new Image;
        switch (slot) {
            case 0: this.imgBear.src = "images/bear.png"; break;
            case 1: this.imgBear.src = "images/bear1.png"; break;
            case 2: this.imgBear.src = "images/bear2.png"; break;
            case 3: this.imgBear.src = "images/bear3.png"; break;
        }
    }
}