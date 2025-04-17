import {Character} from './Character';
import {Game} from './Game';
import {FightLogEntry} from "./FightLogEntry";

export class Post {
  id: number;
  episode_id: number;
  is_read: boolean;
  post_date: string;
  character: Character;
  content: string;
  content_bb: string|null = null;
  is_mine: boolean;
  edit: boolean = false;

  constructor(id: number,
              episodeId: number,
              isRead: boolean,
              postDate: string,
              character: Character,
              content: string,
              contentBB: string|null = null,
              is_mine: boolean,
  ) {
    this.id = id;
   this.is_read = isRead;
   this.episode_id = episodeId;
   this.post_date = postDate;
   this.character = character;
   this.content = content;
   this.content_bb = contentBB;
   this.is_mine = is_mine;
  }
}
