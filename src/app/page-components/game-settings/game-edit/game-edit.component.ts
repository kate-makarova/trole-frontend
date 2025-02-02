import { Component } from '@angular/core';
import {GameFormComponent} from '../../game-form/game-form.component';
import {shareReplay} from 'rxjs';
import {Validators} from '@angular/forms';
import {CharacterSheetService} from '../../../services/character-sheet/character-sheet.service';
import {ActivatedRoute} from '@angular/router';
import {GameSettingsNavComponent} from '../game-settings-nav/game-settings-nav.component';
import {BreadcrumbsService} from '../../../services/breadcrubs/breadcrumbs.service';

@Component({
  selector: 'app-game-edit',
  imports: [
    GameFormComponent,
    GameSettingsNavComponent
  ],
  templateUrl: './game-edit.component.html',
  styleUrl: './game-edit.component.css'
})
export class GameEditComponent {
  gameSettingsTabId: string = 'game-edit';
  gameId: number = 0;

  constructor(private route: ActivatedRoute,
              private breadcrumbsService: BreadcrumbsService) {
    this.gameId = Number(this.route.snapshot.paramMap.get('game_id'));
    this.breadcrumbsService.changeBreadcrumbs('game-settings', [this.gameId])
  }
}
