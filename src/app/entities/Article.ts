export class Article {
    id: number;
    name: string;
    gameId: number;
    userId: number;
    createdAt: Date;
    content: string;

    constructor(id: number, name: string, gameId: number, userId: number, createdAt: Date, content: string) {
        this.id = id;
        this.name = name;
        this.gameId = gameId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.content = content;
    }
}