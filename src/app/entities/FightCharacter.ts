export class FightCharacter {
    characterId: number;
    name: string;
    totalHealth: number;
    currentHealth: number;
    characterClass: string;
    level: number;
    isDown: boolean;

    constructor (
        characterId: number,
    name: string,
    totalHealth: number,
    currentHealth: number,
    characterClass: string,
    level: number,
    isDown: boolean = false
    ) {
    this.characterId = characterId;
    this.name = name;
    this.totalHealth = totalHealth;
    this.currentHealth = currentHealth;
    this.characterClass = characterClass;
    this.level = level;
    this.isDown = isDown;
    }
}