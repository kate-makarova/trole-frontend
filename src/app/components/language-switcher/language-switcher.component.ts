import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-language-switcher',
  imports: [
    FormsModule
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  constructor(private translateService: TranslateService) {}

  locale: string = 'en-US';
  changeLanguage(locale: string) {
    this.translateService.use(locale);
  }
}
