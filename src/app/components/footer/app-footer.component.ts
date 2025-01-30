import {Component, OnInit} from '@angular/core';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {AdsenseModule} from "ng2-adsense";

@Component({
  selector: 'app-footer',
    imports: [
        LanguageSwitcherComponent,
        AdsenseModule
    ],
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.css'
})
export class AppFooterComponent {
}
