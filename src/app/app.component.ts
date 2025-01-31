import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppHeaderComponent} from './components/header/app-header.component';
import {AppFooterComponent} from './components/footer/app-footer.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ThemeService} from "./services/theme/theme.service";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent, BreadcrumbsComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trole-frontend';

  constructor(private translate: TranslateService,
              private themeService: ThemeService) {
    this.translate.addLangs(['ru', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.themeService.setTheme({
      cssFile: 'https://dhbhdrzi4tiry.cloudfront.net/cdn/sites/foundation.min.css',
          themeCSSID: 'style-default'
    })
  }
}
