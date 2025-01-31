import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Theme} from "./Theme";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private style: HTMLLinkElement|undefined;
  private renderer2: Renderer2
  private currentTheme: Theme
  private themeNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('style-default');
  // Expose the observable part of the BehaviorSubject
  public themeName: Observable<string> = this.themeNameSubject.asObservable();

  constructor(
      @Inject(DOCUMENT) private document: Document,
      rendererFactory: RendererFactory2
  ) {
    this.renderer2 = rendererFactory.createRenderer(null, null);
    this.currentTheme =   {
      cssFile: 'https://dhbhdrzi4tiry.cloudfront.net/cdn/sites/foundation.min.css',
      themeCSSID: 'style-default'
    };
  }

  setTheme(theme: Theme) {
    // Create a link element via Angular's renderer to avoid SSR troubles
    this.style = this.renderer2.createElement('link') as HTMLLinkElement;

    // Set type of the link item and path to the css file
    this.renderer2.setProperty(this.style, 'rel', 'stylesheet');
    this.renderer2.setProperty(this.style, 'href', theme.cssFile);
    this.renderer2.setProperty(this.style, 'id', theme.themeCSSID);

    // Add the style to the head section
    this.renderer2.appendChild(this.document.head, this.style);
    this.currentTheme = theme;
    this.themeNameSubject.next(theme.themeCSSID);
  }

  removeCurrentTheme() {
    const themeIDHTMlElem = this.document.getElementById(this.currentTheme.themeCSSID);
    if (themeIDHTMlElem) {
      this.renderer2.removeChild(this.document.head, themeIDHTMlElem);
    }
  }

  removeExistingThemeStyle(themeCSSID: string) {
    const themeIDHTMlElem = this.document.getElementById(themeCSSID);
    if (themeIDHTMlElem) {
      this.renderer2.removeChild(this.document.head, themeIDHTMlElem);
    }
  }
}
