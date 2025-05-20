import {Component, Input} from '@angular/core';
import {Game} from '../../entities/Game';
import {Observable, of} from 'rxjs';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from "@angular/router";
import {PlaceholderImageComponent} from '../placeholder-image/placeholder-image.component';

@Component({
  selector: 'app-game-list',
  imports: [
    AsyncPipe,
    NgForOf,
    RouterLink,
    NgIf,
    PlaceholderImageComponent,
    NgClass
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  @Input('games') games: Observable<Game[]> = of([])

  constructor() {
  }

}
