import {Component, OnInit} from '@angular/core';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {AdsenseModule} from "ng2-adsense";
import {ThemeSwitcherComponent} from "../theme-switcher/theme-switcher.component";
import {RouterLink} from "@angular/router";
import {AnalyticsService} from "../../services/analytics/analytics.service";

@Component({
  selector: 'app-footer',
    imports: [
        LanguageSwitcherComponent,
        AdsenseModule,
        ThemeSwitcherComponent,
        RouterLink
    ],
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.css'
})
export class AppFooterComponent implements OnInit {

    constructor(private analyticsService: AnalyticsService) {
    }

    ngOnInit() {
        this.analyticsService.trackEvent('footer loaded', 'footer loaded into view', 'load');
    }
}
