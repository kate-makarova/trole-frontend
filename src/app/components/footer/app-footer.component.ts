import {Component, OnInit} from '@angular/core';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {AdsenseModule} from "ng2-adsense";
import {ThemeSwitcherComponent} from "../theme-switcher/theme-switcher.component";

@Component({
  selector: 'app-footer',
    imports: [
        LanguageSwitcherComponent,
        AdsenseModule,
        ThemeSwitcherComponent
    ],
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.css'
})
export class AppFooterComponent {
}
