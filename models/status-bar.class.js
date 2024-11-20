class StatusBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/health_0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/health_20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/health_40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/health_60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/health_80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/health_100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = 25;
    this.y = 20;
    this.width = 200;
    this.height = 30;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }

  resolveImageIndex() {
    if (this.percentage > 80) {
      return 5;
    } else if (this.percentage > 60) {
      return 4;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
