class Keyboard {
  RIGHT = false;
  LEFT = false;
  UP = false;
  D = false;

  constructor() {
    this.setupKeyboardControls();
  }

  setupKeyboardControls() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowRight") this.RIGHT = true;
      if (e.code === "ArrowLeft") this.LEFT = true;
      if (e.code === "KeyD") this.D = true;
      if (e.code === "Space") this.UP = true;
    });

    window.addEventListener("keyup", (e) => {
      if (e.code === "ArrowRight") this.RIGHT = false;
      if (e.code === "ArrowLeft") this.LEFT = false;
      if (e.code === "KeyD") this.D = false;
      if (e.code === "Space") this.UP = false;
    });
}
}
