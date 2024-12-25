import { Injectable } from '@angular/core';
import {Episode} from '../../entities/Episode';
import {APIService} from '../apiservice/apiservice.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService extends APIService {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  getEpisodes(game_id: number, page: number): Observable<Episode[]> {
    return this.getData<Episode[]>('episode-list/'+game_id)
    }

    getEpisode(episode_id: number): Observable<Episode> {
      return this.getData<Episode>('episode/'+episode_id)
    }
}
