import { Component } from '@angular/core';
import {Character} from '../../entities/Character';
import {Observable} from 'rxjs';
import {CharacterService} from '../../services/character/character.service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-character-list',
  imports: [
    AsyncPipe
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
  characters: Observable<Character[]> | undefined;
  gameId: number = 0;

  constructor(private characterService: CharacterService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.characters = this.characterService.getCharacters(this.gameId)
  }
}
