import {FightLogEntryLine} from "./FightLogEntryLine";

export class FightLogEntry{
    id: number;
    afterPost: number;
    lines: FightLogEntryLine[] = []

    constructor(id: number, afterPost: number, lines: FightLogEntryLine[] = []) {
        this.id = id;
        this.afterPost = afterPost;
        this.lines = lines;
    }
}