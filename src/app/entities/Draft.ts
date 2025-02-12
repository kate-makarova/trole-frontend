import {SimpleEntity} from "./SimpleEntity";

export class Draft {
    id: number;
    episodeId: number;
    character: SimpleEntity;
    init_date_time: Date;
    date_time: Date;
    auto: Boolean;
    published: Boolean = false;
    published_post_id: number|null = null;
    content_bb: string = '';
    content: string = '';

    constructor(id: number,
    episodeId: number,
    character: SimpleEntity,
    init_date_time: Date,
    date_time: Date,
    auto: Boolean,
    published: Boolean = false,
    published_post_id: number|null = null,
    content_bb: string = '',
    content: string = '') {
        this.id = id;
        this.episodeId = episodeId;
        this.character = character;
        this.init_date_time = init_date_time;
        this.date_time = date_time;
        this.auto = auto;
        this.published = published;
        this.published_post_id = published_post_id;
        this.content_bb = content_bb;
        this.content = content;
    }
}