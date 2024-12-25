import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';
import {APIService} from '../apiservice/apiservice.service';
import {Observable} from 'rxjs';
import {Post} from '../../entities/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService extends APIService {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  getPostsByEpisode(episode_id: number): Observable<Post[]> {
    return this.getData<any>('episode-posts/'+episode_id)
  }
}
