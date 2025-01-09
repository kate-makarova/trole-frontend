import { Injectable } from '@angular/core';
import {EntityService} from "../EntityService";
import {CharacterSheetTemplate} from "../../entities/CharacterSheetTemplate";
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService extends EntityService<CharacterSheetTemplate> {
  protected templateSubject: BehaviorSubject<CharacterSheetTemplate|null> = new BehaviorSubject<CharacterSheetTemplate|null>(null);
  public template$: Observable<CharacterSheetTemplate|null> = this.templateSubject.asObservable();

  protected override endpoints = {
    "loadList": "", //not in use
    "load": "character-sheet/",
    "create": "character-sheet-create",
    "update": "character-sheet-edit/"
  }

  loadCharacterSheetTemplate(gameId: number) {
    this.getData<CharacterSheetTemplate>('character-sheet-template/'+gameId).subscribe((data) => {
      this.templateSubject.next(data)
    })
  }

  getCharacterSheetTemplate(): Observable<CharacterSheetTemplate|null> {
    return this.template$
  }
}
