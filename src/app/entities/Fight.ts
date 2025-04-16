import {FightCharacter} from "./FightCharacter";
import {FightMob} from "./FightMob";
import {Skill} from "./Skill";
import {FightLogEntry} from "./FightLogEntry";

export class Fight {
    characters: FightCharacter[] = [];
    mobs: FightMob[] = [];
    activeCharacterId: number;
    activeUserId: number;
    skills: Skill[] = [];
    currentFightLogEntry: FightLogEntry|null = null;

    constructor(
        characters: FightCharacter[],
        mobs: FightMob[],
        activeCharacterId: number,
        activeUserId: number,
        skills: Skill[],
        currentFightLogEntry: FightLogEntry|null = null
        ) {
        this.characters = characters;
        this.mobs = mobs;
        this.activeCharacterId = activeCharacterId;
        this.activeUserId = activeUserId;
        this.skills = skills;
        this.currentFightLogEntry = currentFightLogEntry;
    }
}