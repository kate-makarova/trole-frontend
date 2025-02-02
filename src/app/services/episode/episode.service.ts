import {Injectable} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EntityService} from '../EntityService';

@Injectable({
    providedIn: 'root'
})
export class EpisodeService extends EntityService<Episode> {
  protected override endpoints = {
    "loadList": "episode-list/",
    "load": "episode/",
    "create": "episode-create",
    "update": "episode-update/"
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
