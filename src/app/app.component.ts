import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppHeaderComponent} from './components/header/app-header.component';
import {AppFooterComponent} from './components/footer/app-footer.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ThemeService} from "./services/theme/theme.service";
import {SessionService} from "./services/session/session.service";
import {User} from "./entities/User";
import {Theme} from "./services/theme/Theme";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent, BreadcrumbsComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trole-frontend';

  constructor(private translate: TranslateService,
              private themeService: ThemeService,
              private sessionService: SessionService) {
    this.translate.addLangs(['ru', 'en']);
    this.translate.setDefaultLang('en');

    this.sessionService.init().then(() => {

      const user: User | null = this.sessionService.getUser();

      let locale = 'en'
      let theme: string = Theme.getDefault().themeCSSID

      if (user != null && user.language != null) {
        locale = user.language
      }

      if (user != null && user.theme != null) {
        theme = user.theme
      }

      this.translate.use(locale);
      this.themeService.setTheme(theme)
    })
  }
}
