import {Character} from './Character';

export class User {
  id: number;
  username: string;
  avatar: string|null;
  is_admin: boolean = false;
  characters: Character[] = []

  constructor(id: number, username: string, avatar: string|null = null, is_admin: boolean = false, characters: Character[] = []) {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.characters = characters;
    this.is_admin = is_admin;
  }
}
