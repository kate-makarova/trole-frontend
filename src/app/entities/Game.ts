import {Character} from './Character';
import {Fandom} from './Fandom';
import {Genre} from './Genre';
import {Media} from './Media';

export class Game {
  id: number;
  name: string;
  total_episodes: number;
  total_posts: number;
  total_characters: number;
  total_users: number;
  description: string;
  image: string | null;
  my_characters:Character[]
  fandoms: Fandom[]
  genres: Genre[]
  media: Media[]

  constructor(id: number,
              name: string,
              description: string,
              totalEpisodeCount: number,
              totalPostCont: number,
              totalCharacterCount: number,
              totalUserCount: number,
              myCharacters: Character[],
              fandoms: Fandom[],
              genres: Genre[],
              media: Media[],
              image: string | null = null) {
    this.id = id;
    this.name = name;
    this.total_episodes = totalEpisodeCount;
    this.total_posts = totalPostCont;
    this.total_characters = totalCharacterCount;
    this.total_users = totalUserCount;
    this.description = description;
    this.image = image;
    this.my_characters = myCharacters;
    this.fandoms = fandoms;
    this.genres = genres;
    this.media = media;
  }
}
