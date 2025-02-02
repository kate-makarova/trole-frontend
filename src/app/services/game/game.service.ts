import { Injectable } from '@angular/core';
import {Game} from '../../entities/Game';
import {Observable} from 'rxjs';
import {EntityService} from '../EntityService';

@Injectable({
  providedIn: 'root'
})
export class GameService extends EntityService<Game> {

  protected override endpoints = {
    "loadList": "", //not used
    "load": "game/",
    "create": "game-create",
    "update": "game-update/"
  }

  join(id: number): Observable<boolean> {
    return this.postData('game-join', {"game": id})
  }

  loadMyGames(): void{
    this.getData<Game[]>('home').subscribe(data => {
      this.entityListSubject.next(data);
    })
  }

  loadAllGames(): void{
    this.getData<Game[]>('game-list').subscribe(data => {
      this.entityListSubject.next(data);
    })
  }
}
