import {FightCharacter} from "./FightCharacter";
import {FightMob} from "./FightMob";

export class FightLogEntryLine {
    attacker: FightCharacter|FightMob;
    target: FightCharacter|FightMob;
    action: string;
    damageType: string;
    damageValue: number;
    attacker_is_character: boolean = false;
    target_is_character: boolean = false;
    skill: string;

    constructor(
        attacker: FightCharacter|FightMob,
        target: FightCharacter|FightMob,
        action: string,
        damageType: string,
        damageValue: number,
        skill: string
        ) {
        this.attacker = attacker;
        this.target = target;
        this.action = action;
        this.damageType = damageType;
        this.damageValue = damageValue;
        this.skill = skill;
        if (this.attacker instanceof FightCharacter) {
            this.attacker_is_character = true;
        }
        if (this.target instanceof FightCharacter) {
            this.target_is_character = true;
        }
    }
}