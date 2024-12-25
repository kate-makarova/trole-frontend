import {Character} from './Character';
import {Game} from './Game';

export class Post {
  id: number;
  episode_id: number;
  is_read: boolean;
  post_date: string;
  character: Character;
  content: string;
  is_mine: boolean;

  constructor(id: number,
              episodeId: number,
              isRead: boolean,
              postDate: string,
              character: Character,
              content: string,
              is_mine: boolean,
  ) {
    this.id = id;
   this.is_read = isRead;
   this.episode_id = episodeId;
   this.post_date = postDate;
   this.character = character;
   this.content = content;
   this.is_mine = is_mine;
  }
}
