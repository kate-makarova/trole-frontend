import { Injectable } from '@angular/core';
import {EntityService} from "../EntityService";
import {CharacterSheetTemplate} from "../../entities/CharacterSheetTemplate";
import {BehaviorSubject, Observable} from 'rxjs';
import {CharacterSheetTemplateField} from '../../entities/CharacterSheetTemplateField';

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService extends EntityService<CharacterSheetTemplate> {
  protected templateSubject: BehaviorSubject<CharacterSheetTemplate|null> = new BehaviorSubject<CharacterSheetTemplate|null>(null);
  public template$: Observable<CharacterSheetTemplate|null> = this.templateSubject.asObservable();
  newFields: number = 0;
  gameId: number = 0;

  protected override endpoints = {
    "loadList": "", //not in use
    "load": "character-sheet/",
    "create": "character-sheet-create",
    "update": "character-sheet-edit/"
  }

  loadCharacterSheetTemplate(gameId: number) {
    this.gameId = gameId;
    this.getData<CharacterSheetTemplate>('character-sheet-template/'+gameId).subscribe((data) => {
      console.log(data)
      this.templateSubject.next(data)
    })
  }

  editCharacterSheetTemplate(templateId: number, data: any) {
    this.postData<CharacterSheetTemplate>('character-sheet-template-update/'+templateId, data).subscribe((data) => {
      console.log('Updated')
    })
  }

  getCharacterSheetTemplate(): Observable<CharacterSheetTemplate|null> {
    return this.template$
  }

  addNewFields() {
    this.newFields += 1;
    let current = this.templateSubject.getValue()
    if (current == null) {
      return;
    }
    current?.fields.push(
      new CharacterSheetTemplateField(-this.newFields, current.id, '', '', true, 1, false, [], current?.fields.length + 1)
    )
    this.templateSubject.next(current)
  }
}
