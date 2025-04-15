export class FightLogEntry{
    afterPost: number;
    text: string;

    constructor(afterPost: number, text: string) {
        this.afterPost = afterPost;
        this.text = text;
    }
}