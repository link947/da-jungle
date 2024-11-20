class FallingAxe extends MovableObject {
    IMAGES_FALLING = [
        "img/6_salsa_bottle/ThrowingAxe01.png",
    ];

    constructor(x, y) {
        super();
        this.loadImage("img/6_salsa_bottle/ThrowingAxe01.png");
        this.x = x;
        this.y = y;
        this.height = 75;
        this.width = 75;
        this.speedY = 0;
        this.applyGravity();
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
          return true;
        } else {
          return this.y <= 350;
        }
      }

    animate() {
        this.applyGravity();
    }
}
