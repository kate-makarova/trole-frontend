import { Injectable } from '@angular/core';
import {Post} from '../../entities/Post';
import {EntityService} from '../EntityService';

@Injectable({
  providedIn: 'root'
})
export class PostService extends EntityService<Post>{

  protected override endpoints = {
    "loadList": "episode-posts/",
    "load": "post/",
    "create": "post-create",
    "update": "post-update/"
  }

  setPostsRead(episodeId: number): void {
    const t = this.getData<any>('set-posts-read/'+episodeId)
    t.subscribe((r) => {
      console.log(r)
    })
  }
}
