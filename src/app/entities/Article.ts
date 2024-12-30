export class Article {
    id: number;
    name: string;
    game_id: number;
    author_id: number;
    date_created: Date;
    content: string;

    constructor(id: number, name: string, gameId: number, userId: number, createdAt: Date, content: string) {
        this.id = id;
        this.name = name;
        this.game_id = gameId;
        this.author_id = userId;
        this.date_created = createdAt;
        this.content = content;
    }
}
