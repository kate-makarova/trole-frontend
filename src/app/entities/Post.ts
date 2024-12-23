import {Character} from './Character';
import {Game} from './Game';

export class Post {
  id: number;
  episodeId: number;
  isRead: boolean;
  postDate: string;
  character: Character;
  content: string;

  constructor(id: number,
              episodeId: number,
              isRead: boolean,
              postDate: string,
              character: Character,
              content: string) {
    this.id = id;
   this.isRead = isRead;
   this.episodeId = episodeId;
   this.postDate = postDate;
   this.character = character;
   this.content = content;
  }
}
