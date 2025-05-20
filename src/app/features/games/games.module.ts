import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GamesRoutingModule } from './games-routing.module';
import { GameComponent } from '../../page-components/game/game.component';
import { GamesComponent } from '../../page-components/games/games.component';
import { GameFormComponent } from '../../page-components/game-form/game-form.component';
import { GameEditComponent } from '../../page-components/game-settings/game-edit/game-edit.component';
import { GameSettingsCharacterSheetComponent } from '../../page-components/game-settings/character-sheet/game-settings-character-sheet.component';

@NgModule({
  declarations: [
    // These components are now part of this feature module
    // and will be lazy loaded with it
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }