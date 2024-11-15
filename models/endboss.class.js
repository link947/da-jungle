class Endboss extends MovableObject {
    height = 300;
    width = 300;
    y = 180;
    currentImage = 0;
    animationTimer = 0;
  
    IMAGES_IDLE = [
      "img/golem/gole_ilde-1.png",
      "img/golem/gole_ilde-2.png",
      "img/golem/gole_ilde-3.png",
      "img/golem/gole_ilde-4.png",
    ];
  
    constructor() {
      super().loadImage("img/golem/gole_ilde-1.png");
      this.loadImages(this.IMAGES_IDLE);
      this.x = 1800;
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES_IDLE);
      }, 200);
    }
  }
  