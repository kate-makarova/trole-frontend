export class TopButton {
  path: string|null = null;
  class: string;
  id: string;
  name: string;
  click: Function|null = null;

  constructor(path: string|null = null, cl: string, id: string, name: string, click?: Function|null ) {
    this.path = path;
    this.class = cl;
    this.id = id;
    this.name = name;
    if (click !== undefined) {
      this.click = click;
    }
  }
}
