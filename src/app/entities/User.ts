import {Character} from './Character';
import {Theme} from "../services/theme/Theme";

export class User {
  id: number;
  username: string;
  avatar: string|null;
  is_admin: boolean = false;
  language: string = 'en'
  characters: Character[] = []
  theme: Theme = Theme.getDefault()

  constructor(id: number,
              username: string,
              avatar: string|null = null,
              is_admin: boolean = false,
              language: string = 'en',
              characters: Character[] = [],
              theme: Theme|null = null) {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.language = language;
    this.characters = characters;
    this.is_admin = is_admin;
    if(theme !== null) {
      this.theme = theme
    }
  }
}
