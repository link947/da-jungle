class Endboss extends MovableObject {
  height = 190;
  width = 190;
  y =240;
  speed = 15;
  status = "idle";
  currentAnimation = null;
  world;
  energy = 100;

  IMAGES_IDLE = [
    "img/golem/gole_ilde-1.png",
    "img/golem/gole_ilde-2.png",
    "img/golem/gole_ilde-3.png",
    "img/golem/gole_ilde-4.png",
  ];

  IMAGES_ACTIVATE = [
    "img/golem/gole_activate-1.png",
    "img/golem/gole_activate-2.png",
    "img/golem/gole_activate-3.png",
    "img/golem/gole_activate-4.png",
    "img/golem/gole_activate-5.png",
    "img/golem/gole_activate-6.png",
    "img/golem/gole_activate-7.png",
    "img/golem/gole_activate-8.png",
    "img/golem/gole_activate-9.png",
    "img/golem/gole_activate-10.png",
    "img/golem/gole_activate-11.png",
  ];

  IMAGES_NEW_IDLE = [
    "img/golem/gole_new_idle-1.png",
    "img/golem/gole_new_idle-2.png",
    "img/golem/gole_new_idle-3.png",
    "img/golem/gole_new_idle-4.png",
  ];

  IMAGES_DEATH = [
    "img/golem/gole_death-1.png",
    "img/golem/gole_death-2.png",
    "img/golem/gole_death-3.png",
    "img/golem/gole_death-4.png",
    "img/golem/gole_death-5.png",
    "img/golem/gole_death-6.png",
    "img/golem/gole_death-8.png",
    "img/golem/gole_death-9.png",
    "img/golem/gole_death-10.png",
  ];

  IMAGES_HIT = [
    "img/golem/gole_hit.png",
    "img/golem/gole_hit-2.png",
    "img/golem/gole_hit-3.png",
    "img/golem/gole_hit-4.png",
    "img/golem/gole_hit-5.png",
  ];

  activateAudio = new Audio("audio/activate.mp3");


  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_HIT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_ACTIVATE);
    this.loadImages(this.IMAGES_NEW_IDLE);
    this.loadImages(this.IMAGES_DEATH);
    this.x = 1800;
    this.movingRight = false;
    this.animate();
  }

  flipImage(ctx) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(
      this.img,
      -this.x - this.width,
      this.y,
      this.width,
      this.height
    );
    ctx.restore();
  }

  draw(ctx) {
    ctx.save();
    ctx.imageSmoothingEnabled = false;

    if (this.img) {
      if (this.movingRight) {
        this.flipImage(ctx);
      } else {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
    }

    ctx.restore();
  }

  animate() {
    let moveDirection = -1;
    setInterval(() => {
      if (this.currentAnimation) return;
      
      if (this.status === "dead") {
        this.currentAnimation = this.playAnimationOnce(this.IMAGES_DEATH, () => {
          this.status = "defeated";
          this.currentAnimation = null;
        });
      } else if (this.status === "activate") {
        this.activateAudio.play();
        this.currentAnimation = this.playAnimationOnce(this.IMAGES_ACTIVATE, () => {
          this.status = "new_idle";
          this.currentAnimation = null;
        });
      } else if (this.status === "new_idle") {
        this.playAnimation(this.IMAGES_NEW_IDLE);
  
        if (this.x <= 1300) {
          moveDirection = 1; 
          this.movingRight = true;
        } else if (this.x >= 1800) {
          moveDirection = -1;
          this.movingRight = false;
        }
  
        this.x += this.speed * moveDirection;
      } else if (this.status === "idle") {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 100);
  }

  hit() {
    if (this.status === "dead" || this.status === "defeated" || this.status === "activate") return;

    this.playAnimation(this.IMAGES_HIT);
    this.energy -= 17;
    
    if (this.energy <= 0) {
      this.energy = 0;
      this.status = "dead";
    } else if (this.status === "idle") {
      this.status = "activate";
    }
  }

  playAnimationOnce(images, onComplete) {
    let index = 0;
    const interval = setInterval(() => {
      this.img = this.imgCache[images[index]];
      index++;

      if (index >= images.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 200);
    return interval;
  }
}
