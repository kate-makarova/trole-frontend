import {Character} from './Character';
import {Game} from './Game';

export class Episode {
  id: number;
  title: string;
  status: string;
  is_my_episode: boolean;
  totalPostCount: number;
  lastPostDate: string;
  lastPostCharacterName: string;
  description: string;
  image: string | null;
  characters:Character[]
  gameId: number;

  constructor(id: number,
              title: string,
              status: string,
              is_my_episode: boolean,
              description: string,
              totalPostCont: number,
              lastPostDate: string,
              lastPostCharacterName: string,
              characters: Character[],
              gameId: number,
              image: string | null = null) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.is_my_episode = is_my_episode;
    this.totalPostCount = totalPostCont;
    this.lastPostDate = lastPostDate;
    this.lastPostCharacterName = lastPostCharacterName;
    this.description = description;
    this.image = image;
    this.characters = characters;
    this.gameId = gameId;
  }
}
