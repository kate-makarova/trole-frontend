export class FightMob {
    mobId: number;
    name: string;
    totalHealth: number;
    currentHealth: number;
    mobClass: string;
    level: number;
    isDown: boolean;

    constructor (
        mobId: number,
        name: string,
        totalHealth: number,
        currentHealth: number,
        mobClass: string,
        level: number,
        isDown: boolean = false
    ) {
        this.mobId = mobId;
        this.name = name;
        this.totalHealth = totalHealth;
        this.currentHealth = currentHealth;
        this.mobClass = mobClass;
        this.level = level;
        this.isDown = isDown;
    }
}