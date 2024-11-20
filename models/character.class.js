class Character extends MovableObject {
  x = 120;
  y = 75;
  height = 150;
  width = 75;
  animationSpeed = 30;
  walkingSpeed = 15;
  currentAnimation = null;
  jumpHeight = 30;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/idle-1.png",
    "img/2_character_pepe/1_idle/idle/idle-2.png",
    "img/2_character_pepe/1_idle/idle/idle-3.png",
    "img/2_character_pepe/1_idle/idle/idle-4.png",
    "img/2_character_pepe/1_idle/idle/idle-5.png",
    "img/2_character_pepe/1_idle/idle/idle-6.png",
    "img/2_character_pepe/1_idle/idle/idle-7.png",
    "img/2_character_pepe/1_idle/idle/idle-8.png",
    "img/2_character_pepe/1_idle/idle/idle-9.png",
    "img/2_character_pepe/1_idle/idle/idle-10.png",
    "img/2_character_pepe/1_idle/idle/idle-11.png",
    "img/2_character_pepe/1_idle/idle/idle-12.png",
  ];

  IMAGES_RUN = [
    "img/2_character_pepe/2_run/run-1.png",
    "img/2_character_pepe/2_run/run-2.png",
    "img/2_character_pepe/2_run/run-3.png",
    "img/2_character_pepe/2_run/run-4.png",
    "img/2_character_pepe/2_run/run-5.png",
    "img/2_character_pepe/2_run/run-6.png",
    "img/2_character_pepe/2_run/run-7.png",
    "img/2_character_pepe/2_run/run-8.png",
  ];

  IMAGES_JUMP = [
    "img/2_character_pepe/3_jump/jump-1.png",
    "img/2_character_pepe/3_jump/jump-2.png",
    "img/2_character_pepe/3_jump/jump-3.png",
    "img/2_character_pepe/3_jump/jump-4.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/4_dead/dead-1.png",
    "img/2_character_pepe/4_dead/dead-2.png",
    "img/2_character_pepe/4_dead/dead-3.png",
    "img/2_character_pepe/4_dead/dead-4.png",
    "img/2_character_pepe/4_dead/dead-5.png",
    "img/2_character_pepe/4_dead/dead-6.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/hurt-1.png",
    "img/2_character_pepe/4_hurt/hurt-2.png",
    "img/2_character_pepe/4_hurt/hurt-3.png",
  ];

  walkingSound = new Audio("audio/running.wav");
  jumpingSound = new Audio("audio/jump.wav");
  deathSound = new Audio("audio/hurt2.wav");
  hurtSound = new Audio("audio/hurt.wav");

  constructor() {
    super();
    this.loadImage("img/2_character_pepe/1_idle/idle/idle-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_RUN);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.deathSound.play();
        this.handleDeathAnimation();
        return;
      }

      if (this.isHurt() && !this.isHurtState) {
        this.hurtSound.play();
        this.handleHurtAnimation();
        return;
      }

      this.walkingSound.pause();

      if (this.isAboveGround()) {
        this.handleJumpAnimation();
      }

      if (keyboard.UP && !this.isAboveGround()) {
        this.jump();
      }

      if (keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
      }

      if (keyboard.LEFT && this.x > 0) {
        this.moveLeft();
      }

      if (
        !keyboard.RIGHT &&
        !keyboard.LEFT &&
        !this.isAboveGround() &&
        !this.isHurtState
      ) {
        this.switchAnimation(this.IMAGES_IDLE);
      }

      if (this.world) {
        this.world.camera_x = -this.x + 100;
      }
    }, 100 - this.animationSpeed);
  }

  jump() {
    this.speedY = this.jumpHeight;
    this.jumpingSound.play();
    this.img = this.imgCache[this.IMAGES_JUMP[0]];
  }

  moveRight() {
    this.x += this.walkingSpeed;

    if (this.isAboveGround()) {
      this.walkingSound.pause();
    } else {
      this.walkingSound.play();
      this.switchAnimation(this.IMAGES_RUN);
    }
  }

  moveLeft() {
    this.x -= this.walkingSpeed;

    if (this.isAboveGround()) {
      this.walkingSound.pause();
    } else {
      this.walkingSound.play();
      this.switchAnimation(this.IMAGES_RUN);
    }
  }

  handleJumpAnimation() {
    if (this.speedY > 5) {
      this.img = this.imgCache[this.IMAGES_JUMP[1]];
    } else if (this.speedY <= 5 && this.speedY > -5) {
      this.img = this.imgCache[this.IMAGES_JUMP[2]];
    } else {
      this.img = this.imgCache[this.IMAGES_JUMP[3]];
    }
  }

  handleDeathAnimation() {
    if (this.currentAnimation !== this.IMAGES_DEAD) {
      this.switchAnimation(this.IMAGES_DEAD);
      this.width = 150;
      this.deathSound.play();
    }

    if (this.currentImg < this.IMAGES_DEAD.length - 1) {
      this.playAnimation(this.IMAGES_DEAD);
    } else {
      this.currentImg = this.IMAGES_DEAD.length - 1;
      setTimeout(() => {
        this.deathSound.pause();
        this.deathSound.currentTime = 0;
      }, 700);
    }

    this.walkingSound.pause();
    this.jumpingSound.pause();
  }

  handleHurtAnimation() {
    if (!this.isHurtState) {
      this.isHurtState = true;
      this.switchAnimation(this.IMAGES_HURT);
      setTimeout(() => {
        if (!this.isDead()) {
          this.switchAnimation(this.IMAGES_IDLE);
        }
        this.isHurtState = false;
      }, 200);
    }
  }

  switchAnimation(images) {
    if (this.currentAnimation !== images) {
      this.currentAnimation = images;
      this.currentImg = 0;
    }
    this.playAnimation(this.currentAnimation);
  }

  playAnimation(images) {
    if (images && images.length > 0) {
      this.currentImg = (this.currentImg + 1) % images.length;
      const path = images[this.currentImg];
      this.img = this.imgCache[path];
      if (!this.img.complete || this.img.naturalHeight === 0) {
        this.img.onload = () => {
          this.img = this.imgCache[path];
        };
      }
    }
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
      if (keyboard.LEFT && !this.isDeadState) {
        this.flipImage(ctx);
      } else {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
    }

    ctx.restore();
  }
}
