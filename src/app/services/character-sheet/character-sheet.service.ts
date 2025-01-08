import { Injectable } from '@angular/core';
import {EntityService} from "../EntityService";
import {CharacterSheet} from "../../entities/CharacterSheet";

@Injectable({
  providedIn: 'root'
})
export class CharacterSheetService extends EntityService<CharacterSheet> {

  protected override endpoints = {
    "loadList": "", //not in use
    "load": "character-sheet/",
    "create": "character-sheet-create",
    "update": "character-sheet-edit/"
  }
}
