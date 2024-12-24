import {Character} from './Character';
import {Fandom} from './Fandom';
import {Genre} from './Genre';
import {Media} from './Media';

export class Game {
  id: number;
  name: string;
  total_posts: number;
  description: string;
  image: string | null;
  my_characters:Character[]
  fandoms: Fandom[]
  genres: Genre[]
  media: Media[]

  constructor(id: number,
              name: string,
              description: string,
              totalPostCont: number,
              myCharacters: Character[],
              fandoms: Fandom[],
              genres: Genre[],
              media: Media[],
              image: string | null = null) {
    this.id = id;
    this.name = name;
    this.total_posts = totalPostCont;
    this.description = description;
    this.image = image;
    this.my_characters = myCharacters;
    this.fandoms = fandoms;
    this.genres = genres;
    this.media = media;
  }
}
