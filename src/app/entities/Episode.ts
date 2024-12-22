export class Episode {
  id: number;
  title: string;
  postCount: number;

  constructor(id: number, title: string, postCont: number) {
    this.id = id;
    this.title = title;
    this.postCount = postCont;
  }
}
