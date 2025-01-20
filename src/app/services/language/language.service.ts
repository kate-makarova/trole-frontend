import { Injectable } from '@angular/core';
import {EntityService} from "../EntityService";
import {SimpleEntity} from "../../entities/SimpleEntity";

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends EntityService<SimpleEntity>{

  override loadList() {
    this.getData<SimpleEntity[]>('language-list').subscribe(data => {
      this.entityListSubject.next(data);
    })
  }

  loadGameLanguagesList(gameId: number) {
    this.getData<SimpleEntity[]>('game-language-list/'+gameId).subscribe(data => {
      this.entityListSubject.next(data);
    })
  }
}
