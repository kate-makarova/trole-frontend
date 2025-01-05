import { Injectable } from '@angular/core';
import {Character} from '../../entities/Character';
import {Observable} from 'rxjs';
import {SimpleEntity} from '../../entities/SimpleEntity';
import {EntityService} from '../EntityService';

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends EntityService<Character> {

  protected override endpoints = {
    "loadList": "character-list/",
    "load": "character/",
    "create": "character-create",
    "update": "character-edit/"
  }

  characterAutocomplete(gameId: number, term: string): Observable<SimpleEntity[]> {
    return this.getData<SimpleEntity[]>('character-autocomplete/'+gameId+'/'+term)
  }
}
