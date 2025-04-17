export class FightAction {
    characterId: number;
    skillId: number;
    mobId: number;

    constructor(characterId: number, skillId: number, mobId: number) {
        this.characterId = characterId;
        this.skillId = skillId;
        this.mobId = mobId;
    }
}