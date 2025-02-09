import { Injectable } from '@angular/core';
import {EntityService} from "../entity/entity.service";
import {CharacterSheetTemplate} from "../../entities/CharacterSheetTemplate";
import {BehaviorSubject, Observable} from 'rxjs';
import {CharacterSheetTemplateField} from '../../entities/CharacterSheetTemplateField';
import {CharacterSheet} from '../../entities/CharacterSheet';

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService extends EntityService<CharacterSheetTemplate> {
  protected templateSubject: BehaviorSubject<CharacterSheetTemplate|null> = new BehaviorSubject<CharacterSheetTemplate|null>(null);
  public template$: Observable<CharacterSheetTemplate|null> = this.templateSubject.asObservable();
  protected characterSheetSubject: BehaviorSubject<CharacterSheet|null> = new BehaviorSubject<CharacterSheet|null>(null);
  public characterSheet$: Observable<CharacterSheet|null> = this.characterSheetSubject.asObservable();
  newFields: number = 0;
  gameId: number = 0;
  characterId = 0;

  protected override endpoints = {
    "loadList": "", //not in use
    "load": "character-sheet/",
    "create": "character-sheet-create",
    "update": "character-sheet-edit/",
    "delete": ""
  }

  loadCharacterSheet(characterId: number) {
    this.characterId = characterId;
    this.getData<CharacterSheet>('character-sheet/'+characterId).subscribe((data) => {
      console.log(data)
      this.characterSheetSubject.next(data)
    })
  }

  getCharacterSheet(): Observable<CharacterSheet|null> {
    return this.characterSheet$;
  }

  loadCharacterSheetTemplate(gameId: number) {
    this.gameId = gameId;
    this.getData<CharacterSheetTemplate>('character-sheet-template/'+gameId).subscribe((data) => {
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
