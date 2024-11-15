class Level {
    enemies;
    bats;
    backgroundObjects;
    level_end_x = 1520;

    constructor(enemies, bats, backgroundObjects){
        this.enemies = enemies;
        this.bats = bats;
        this.backgroundObjects = backgroundObjects;
    }
}