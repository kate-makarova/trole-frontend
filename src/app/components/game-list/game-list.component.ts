import {Component, Input} from '@angular/core';
import {Game} from '../../entities/Game';

@Component({
  selector: 'app-game-list',
  imports: [],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  @Input('games') games: Game[] = []
}
