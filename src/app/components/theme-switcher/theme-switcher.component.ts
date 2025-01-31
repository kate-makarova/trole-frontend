import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";
import {FormsModule} from "@angular/forms";
import {Theme} from "../../services/theme/Theme";

@Component({
  selector: 'app-theme-switcher',
  imports: [
    FormsModule
  ],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css'
})
export class ThemeSwitcherComponent {
  themeId:string = 'style-default'
  themes: Theme[] = [
    {
      cssFile: 'https://dhbhdrzi4tiry.cloudfront.net/cdn/sites/foundation.min.css',
      themeCSSID: 'style-default'
    },
    {
      cssFile: '/foundation-dark.css',
      themeCSSID: 'style-dark'
    }
  ]
  constructor(private themeService: ThemeService,
             ) {}

  themeChange(themeId: string) {
    const theme: Theme|undefined = this.themes.find((theme) => theme.themeCSSID == themeId)
    if (theme == undefined) {return}
    this.themeService.removeCurrentTheme()
    this.themeService.setTheme(theme)
  }
}
