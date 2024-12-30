import {SimpleEntity} from './SimpleEntity';

export class Article {
    id: number;
    name: string;
    game: SimpleEntity;
    author: SimpleEntity;
    date_created: Date;
    content: string;

    constructor(id: number, name: string, game: SimpleEntity, user: SimpleEntity, createdAt: Date, content: string) {
        this.id = id;
        this.name = name;
        this.game = game;
        this.author = user;
        this.date_created = createdAt;
        this.content = content;
    }
}
