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
  constructor(private themeService: ThemeService,
             ) {}

  themeChange(themeId: string) {
    const theme: Theme|undefined = Theme.getAll().find((theme) => theme.themeCSSID == themeId)
    if (theme == undefined) {return}
    this.themeService.removeCurrentTheme()
    this.themeService.setTheme(theme)
  }
}
