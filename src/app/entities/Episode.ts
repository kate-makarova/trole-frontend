import {Character} from './Character';
import {SimpleEntity} from './SimpleEntity';

export class Episode {
  id: number;
  name: string;
  status: string;
  is_mine: boolean;
  total_posts: number;
  last_post_date: string;
  last_post_author: SimpleEntity;
  description: string;
  image: string | null;
  characters:Character[]
  game_id: number;

  constructor(id: number,
              title: string,
              status: string,
              is_my_episode: boolean,
              description: string,
              totalPostCont: number,
              lastPostDate: string,
              lastPostCharacter: SimpleEntity,
              characters: Character[],
              gameId: number,
              image: string | null = null) {
    this.id = id;
    this.name = title;
    this.status = status;
    this.is_mine = is_my_episode;
    this.total_posts = totalPostCont;
    this.last_post_date = lastPostDate;
    this.last_post_author = lastPostCharacter;
    this.description = description;
    this.image = image;
    this.characters = characters;
    this.game_id = gameId;
  }
}
