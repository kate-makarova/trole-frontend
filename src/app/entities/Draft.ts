import {SimpleEntity} from "./SimpleEntity";

export class Draft {
    id: number;
    character: SimpleEntity;
    date_time: Date;
    auto: Boolean;
    published: Boolean = false;
    published_post_id: number|null = null;
    content_bb: string = '';
    content: string = '';

    constructor(id: number,
    character: SimpleEntity,
    date_time: Date,
    auto: Boolean,
    published: Boolean = false,
    published_post_id: number|null = null,
    content_bb: string = '',
    content: string = '') {
        this.id = id;
        this.character = character;
        this.date_time = date_time;
        this.auto = auto;
        this.published = published;
        this.published_post_id = published_post_id;
        this.content_bb = content_bb;
        this.content = content;
    }
}