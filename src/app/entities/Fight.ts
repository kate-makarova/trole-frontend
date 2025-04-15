import {FightLogEntry} from "./FightLogEntry";
import {FightCharacter} from "./FightCharacter";

export class Fight {
    characters: FightCharacter[] = [];

    constructor(characters: FightCharacter[]) {
        this.characters = characters;
    }
}