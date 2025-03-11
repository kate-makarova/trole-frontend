export class SimpleUser {
  id: number;
  name: string;
  avatar: string|null;
  constructor(id: number, name: string, avatar: string|null) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
  }
}
