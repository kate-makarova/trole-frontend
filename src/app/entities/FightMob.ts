export class FightMob {
    mobId: number;
    mobName: string;
    totalHealth: number;
    currentHealth: number;
    mobClass: string;
    level: number;
    isDown: boolean;

    constructor (
        mobId: number,
        mobName: string,
        totalHealth: number,
        currentHealth: number,
        mobClass: string,
        level: number,
        isDown: boolean = false
    ) {
        this.mobId = mobId;
        this.mobName = mobName;
        this.totalHealth = totalHealth;
        this.currentHealth = currentHealth;
        this.mobClass = mobClass;
        this.level = level;
        this.isDown = isDown;
    }
}