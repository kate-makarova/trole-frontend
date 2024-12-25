import { Injectable } from '@angular/core';
import {Game} from '../../entities/Game';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIService} from '../apiservice/apiservice.service';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService extends APIService {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  getMyGames(): Observable<Game[]> {
    return this.getData<Game[]>('home')
  }

  getGame(id: number): Observable<Game> {
    return this.getData<Game>('game/'+id)
  }
}
