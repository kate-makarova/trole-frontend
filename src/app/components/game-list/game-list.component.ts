import {Component, Input} from '@angular/core';
import {Game} from '../../entities/Game';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-game-list',
  imports: [
    AsyncPipe
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  // @ts-ignore
  @Input('games') games: Observable<Game[]> = []
}
