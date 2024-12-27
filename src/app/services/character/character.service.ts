import { Injectable } from '@angular/core';
import {APIService} from '../apiservice/apiservice.service';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../session/session.service';
import {Router} from '@angular/router';
import {Character} from '../../entities/Character';
import {Observable} from 'rxjs';
import {SimpleEntity} from '../../entities/SimpleEntity';

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends APIService {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  getCharacters(game_id: number): Observable<Character[]> {
      return this.getData<Character[]>('character-list/'+game_id)
    }

  override autocomplete(term: string): Observable<SimpleEntity[]> {
    return super.autocomplete('Character', term);
  }

    create(formData: any): Observable<number> {
    return this.postData('character-create', formData);
    }
}
