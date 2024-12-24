import { Injectable } from '@angular/core';
import {Game} from '../../entities/Game';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIService} from '../apiservice/apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends APIService {

  constructor(http: HttpClient) {
    super(http);
  }

  getMyGames(): Observable<Game[]> {
    return this.getData<Game[]>('/home')
  }

  getGame(id: number): Observable<Game> {
    return this.getData<Game>('/game/', {id: id})
  }
}
