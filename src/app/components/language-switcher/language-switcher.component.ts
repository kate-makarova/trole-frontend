import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  imports: [
    FormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  constructor(private translateService: TranslateService) {}

  locale: string = 'en';
  default_locale$ = of('en');

  changeLanguage(locale: string) {
    this.translateService.use(locale);
  }
}
