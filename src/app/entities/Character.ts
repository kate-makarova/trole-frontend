export class Character {
  id: number;
  name: string;
  is_mine: boolean;
  image: string | null;

  constructor(id: number, name: string, is_mine: boolean, image: string | null = null) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.is_mine = is_mine;
  }
}
