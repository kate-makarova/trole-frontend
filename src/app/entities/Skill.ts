export class Skill {
    id: number;
    name: string;
    description: string;
    type: string;
    damageType: string;
    baseDamage: number;
    diceType: number;
    actionPointType: number;
    actionPointTypeCost: number;
    icon: string;

    constructor(
        id: number,
        name: string,
        description: string,
        type: string,
        damageType: string,
        baseDamage: number,
        diceType: number,
        actionPointType: number,
        actionPointTypeCost: number,
        icon: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.damageType = damageType;
        this.baseDamage = baseDamage;
        this.diceType = diceType;
        this.actionPointType = actionPointType;
        this.actionPointTypeCost = actionPointTypeCost;
        this.icon = icon
    }
}