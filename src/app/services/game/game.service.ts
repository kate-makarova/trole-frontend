import { Injectable } from '@angular/core';
import {Game} from '../../entities/Game';
import {Observable} from 'rxjs';
import {EntityService} from '../EntityService';

@Injectable({
  providedIn: 'root'
})
export class GameService extends EntityService<Game> {

  protected override endpoints = {
    "loadList": "game-list/",
    "load": "game/",
    "create": "game-create",
    "update": "game-edit/"
  }

  join(id: number): Observable<boolean> {
    return this.postData('game-join', {"game": id})
  }

  loadMyGames(): void{
    this.getData<Game[]>('home').subscribe(data => {
      this.entityListSubject.next(data);
    })
  }
}
