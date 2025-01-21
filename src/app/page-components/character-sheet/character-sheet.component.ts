import {Component, OnInit} from '@angular/core';
import {CharacterSheet} from '../../entities/CharacterSheet';
import {Observable, of, shareReplay} from 'rxjs';

import {ActivatedRoute} from '@angular/router';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../services/session/session.service';
import {CharacterSheetService} from '../../services/character-sheet/character-sheet.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {TopButtonsComponent} from '../../components/top-buttons/top-buttons.component';

@Component({
  selector: 'app-character-sheet',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent implements OnInit {
  characterSheet$: Observable<CharacterSheet|null> = of(null);
  characterId: number;
  characterName$: Observable<string|null> = of(null);
  avatar$: Observable<string|null> = of(null);

  constructor( private characterSheetService: CharacterSheetService,
               private route: ActivatedRoute,
               private breadcrumbService: BreadcrumbsService,
               private titleService: Title,
               private sessionService: SessionService) {
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

    })
  }
}
