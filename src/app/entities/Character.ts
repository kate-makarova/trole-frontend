export class Character {
  id: number;
  name: string;
  is_mine: boolean;
  status: number;
  unread_posts: number|null;
  new_episodes: number|null;
  avatar: string | null;

  constructor(id: number, name: string, is_mine: boolean,
              status: number = 1, image: string | null = null,
              unread_posts: number|null = null, new_episodes: number|null = null) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.avatar = image;
    this.is_mine = is_mine;
    this.unread_posts = unread_posts;
    this.new_episodes = new_episodes;
  }
}
