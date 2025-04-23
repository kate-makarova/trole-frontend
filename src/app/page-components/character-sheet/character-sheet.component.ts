import {Component, OnInit} from '@angular/core';
import {CharacterSheet} from '../../entities/CharacterSheet';
import {Observable, of, shareReplay} from 'rxjs';

import {ActivatedRoute} from '@angular/router';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import {Title} from '@angular/platform-browser';
import {CharacterSheetService} from '../../services/character-sheet/character-sheet.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {TopButtonsComponent} from '../../components/top-buttons/top-buttons.component';
import {TopButton} from "../../entities/TopButton";

@Component({
  selector: 'app-character-sheet',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    TopButtonsComponent
  ],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent implements OnInit {
  characterSheet$: Observable<CharacterSheet|null> = of(null);
  characterId: number;
  characterName$: Observable<string|null> = of(null);
  avatar$: Observable<string|null> = of(null);
  topButtons: TopButton[] = [];

  constructor( private characterSheetService: CharacterSheetService,
               private route: ActivatedRoute,
               private breadcrumbService: BreadcrumbsService,
               private titleService: Title) {
    this.characterId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.characterSheetService.loadCharacterSheet(this.characterId)
    this.breadcrumbService.changeBreadcrumbs('character', [this.characterId])
    this.characterSheet$ = this.characterSheetService.getCharacterSheet().pipe(shareReplay(1))
    this.characterSheet$.subscribe(characterSheet => {
      if (characterSheet == null) {return}
      const character_name = characterSheet.fields.filter(field => field.field_name == 'name')[0]['value']
      this.characterName$ = of(character_name)
      this.titleService.setTitle(character_name)
      const avatar = characterSheet.fields.filter(field => field.field_name == 'avatar')[0]['value']
      this.avatar$ = of(avatar)

      this.topButtons = []
      if(characterSheet.can_moderate) {
        this.topButtons.push({
          path: '/character-moderate/'+this.characterId,
          name: 'Moderate',
          class: 'button primary',
          id: 'top-button-character-moderate',
          click: null
        })
      }
      if(characterSheet.can_edit) {
        this.topButtons.push(        {
          path: '/character-edit/'+characterSheet.game_id + '/' + this.characterId,
          name: 'Edit',
          class: 'button primary',
          id: 'top-button-character-edit',
          click: null
        })
      }
    })
  }
}
