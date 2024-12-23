import {Character} from './Character';

export class User {
  id: number;
  username: string;
  avatar: string|null;
  characters: Character[] = []

  constructor(id: number, username: string, avatar: string|null = null, characters: Character[] = []) {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.characters = characters;
  }
}
