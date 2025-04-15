import {FightLogEntry} from "./FightLogEntry";
import {FightCharacter} from "./FightCharacter";
import {FightMob} from "./FightMob";

export class Fight {
    characters: FightCharacter[] = [];
    mobs: FightMob[] = [];

    constructor(characters: FightCharacter[], mobs: FightMob[]) {
        this.characters = characters;
        this.mobs = mobs;
    }
}