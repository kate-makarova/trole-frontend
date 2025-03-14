import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TopButton} from '../../entities/TopButton';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-top-buttons',
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './top-buttons.component.html',
  styleUrl: './top-buttons.component.css'
})
export class TopButtonsComponent {
  @Input('buttons') buttons: TopButton[] = [];
}
