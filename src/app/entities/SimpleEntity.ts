export interface ISimpleEntity {
  id: number;
  name: string;
}

export class SimpleEntity implements ISimpleEntity {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
