export interface ISimpleUser {
  id: number;
  name: string;
  avatar: string|null;
}

export class SimpleUser implements ISimpleUser {
  id: number;
  name: string;
  avatar: string|null;
  constructor(id: number, name: string, avatar: string|null) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
  }
}
