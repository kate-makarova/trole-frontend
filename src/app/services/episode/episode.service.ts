import {Injectable} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EntityService} from "../entity/entity.service";


@Injectable({
    providedIn: 'root'
})
export class EpisodeService extends EntityService<Episode> {
  protected override endpoints = {
    "loadList": "episode-list/",
    "load": "episode/",
    "create": "episode-create",
    "update": "episode-update/",
    "delete": ""
  }

  public addPost() {
    let episode: Episode|null = this.entitySubject.value;
    if (episode == null) {return}
    episode.total_posts += 1
    this.entitySubject.next(episode)
  }

  public loadTest()
  {
    this.entitySubject.next(new Episode(
        100,
        'Test',
        'active',
        true,
        'Test episode',
        0,
        null,
        null,
        [],
        1,
        null,
        false,
        null
    ))
  }
}
