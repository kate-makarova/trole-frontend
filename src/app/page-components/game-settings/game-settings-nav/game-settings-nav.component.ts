import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-game-settings-nav',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './game-settings-nav.component.html',
  styleUrl: './game-settings-nav.component.css'
})
export class GameSettingsNavComponent {
  @Input('tabId') tabId:string = ''
  @Input('gameId') gameId: number = 0
}
