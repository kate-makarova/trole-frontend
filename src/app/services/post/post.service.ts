import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';
import {APIService} from '../apiservice/apiservice.service';
import {Observable} from 'rxjs';
import {Post} from '../../entities/Post';
import {Episode} from '../../entities/Episode';
import {EntityServiceInterface} from '../entityServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class PostService extends APIService implements EntityServiceInterface{

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  getList(episodeId: number, page: number): Observable<Post[]> {
    return this.getData<any>('episode-posts/'+episodeId)
  }

  get(id: number): Observable<Episode> {
    return this.getData<Episode>('post/' + id)
  }

  create(formData: any): Observable<number> {
    return this.postData('post-create', formData);
  }

  update(id: number, formData: any): Observable<number> {
    return this.postData('post-edit/' + id, formData);
  }

  setPostsRead(episodeId: number): void {
    const t = this.getData<any>('set-posts-read/'+episodeId)
    t.subscribe((r) => {
      console.log(r)
    })
  }
}
