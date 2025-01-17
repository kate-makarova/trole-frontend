import {SimpleEntity} from './SimpleEntity';

export class Page {
    id: number;
    name: string;
    author: SimpleEntity;
    date_created: Date;
    content: string;
    content_bb: string;

    constructor(id: number, name: string,
                user: SimpleEntity, createdAt: Date, content: string, content_bb: string) {
        this.id = id;
        this.name = name;
        this.author = user;
        this.date_created = createdAt;
        this.content = content;
        this.content_bb = content_bb;
    }
}
