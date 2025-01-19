import {Component, OnInit} from '@angular/core';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-footer',
  imports: [
    LanguageSwitcherComponent
  ],
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.css'
})
export class AppFooterComponent {
}
