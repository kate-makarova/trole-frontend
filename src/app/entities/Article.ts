import {SimpleEntity} from './SimpleEntity';

export class Article {
    id: number;
    name: string;
    game: SimpleEntity;
    author: SimpleEntity;
    date_created: Date;
    content: string;
    content_bb: string;

    constructor(id: number, name: string, game: SimpleEntity,
                user: SimpleEntity, createdAt: Date, content: string, content_bb: string) {
        this.id = id;
        this.name = name;
        this.game = game;
        this.author = user;
        this.date_created = createdAt;
        this.content = content;
        this.content_bb = content_bb;
    }
}
