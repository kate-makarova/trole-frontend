export class FightMob {
    id: number;
    name: string;
    totalHealth: number;
    currentHealth: number;
    mobClass: string;
    level: number;
    isDown: boolean;

    constructor (
        id: number,
        name: string,
        totalHealth: number,
        currentHealth: number,
        mobClass: string,
        level: number,
        isDown: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.totalHealth = totalHealth;
        this.currentHealth = currentHealth;
        this.mobClass = mobClass;
        this.level = level;
        this.isDown = isDown;
    }
}