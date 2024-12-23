import {Character} from './Character';
import {Fandom} from './Fandom';
import {Genre} from './Genre';
import {Media} from './Media';

export class Game {
  id: number;
  title: string;
  totalPostCount: number;
  weeklyPostCount: number;
  description: string;
  image: string | null;
  myCharacters:Character[]
  fandoms: Fandom[]
  genres: Genre[]
  media: Media[]

  constructor(id: number,
              title: string,
              description: string,
              totalPostCont: number,
              weeklyPostCount: number,
              myCharacters: Character[],
              fandoms: Fandom[],
              genres: Genre[],
              media: Media[],
              image: string | null = null) {
    this.id = id;
    this.title = title;
    this.totalPostCount = totalPostCont;
    this.weeklyPostCount = weeklyPostCount;
    this.description = description;
    this.image = image;
    this.myCharacters = myCharacters;
    this.fandoms = fandoms;
    this.genres = genres;
    this.media = media;
  }
}
