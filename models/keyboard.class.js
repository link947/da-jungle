class Keyboard {
  RIGHT = false;
  LEFT = false;
  UP = false;

  constructor() {
    this.setupKeyboardControls();
  }

  setupKeyboardControls() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") this.RIGHT = true;
      if (e.key === "ArrowLeft") this.LEFT = true;
      if (e.key === "ArrowUp") this.UP = true;
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight") this.RIGHT = false;
      if (e.key === "ArrowLeft") this.LEFT = false;
      if (e.key === "ArrowUp") this.UP = false;
    });
  }
}
