import { Injectable } from '@angular/core';
import {Game} from '../../entities/Game';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIService} from '../apiservice/apiservice.service';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';
import {EntityServiceInterface} from '../entityServiceInterface';
import {Episode} from '../../entities/Episode';

@Injectable({
  providedIn: 'root'
})
export class GameService extends APIService implements EntityServiceInterface {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  getList(userId: number, page: number): Observable<Game[]> {
    return this.getData<Game[]>('game-list/' + userId)
  }

  create(formData: any): Observable<number> {
    return this.postData('game-create', formData);
  }

  update(id: number, formData: any): Observable<number> {
    return this.postData('game-edit/' + id, formData);
  }

  getMyGames(): Observable<Game[]> {
    return this.getData<Game[]>('home')
  }

  get(id: number): Observable<Game> {
    return this.getData<Game>('game/'+id)
  }
}
