import {FightLogEntryLine} from "./FightLogEntryLine";

export class FightLogEntry{
    afterPost: number;
    lines: FightLogEntryLine[] = []

    constructor(afterPost: number, lines: FightLogEntryLine[] = []) {
        this.afterPost = afterPost;
        this.lines = lines;
    }
}