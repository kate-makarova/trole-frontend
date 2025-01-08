import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-game-settings-nav',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './game-settings-nav.component.html',
  styleUrl: './game-settings-nav.component.css'
})
export class GameSettingsNavComponent {
  @Input('tabId') tabId:string = ''
}
