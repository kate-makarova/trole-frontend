import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  // Store asset URLs for easy access
  searchIconUrl: string = environment.assets.images.searchIcon;
  backgroundImageUrl: string = environment.assets.images.backgroundImage;
  foundationCssUrl: string = environment.assets.css.foundation;
  newsArticle1Url: string = environment.assets.images.newsArticle1;
  newsArticle2Url: string = environment.assets.images.newsArticle2;

  constructor() {
    // No need to do anything in constructor
  }

  /**
   * Get the search icon URL
   */
  getSearchIconUrl(): string {
    return this.searchIconUrl;
  }

  /**
   * Get the background image URL
   */
  getBackgroundImageUrl(): string {
    return this.backgroundImageUrl;
  }

  /**
   * Get the foundation CSS URL
   */
  getFoundationCssUrl(): string {
    return this.foundationCssUrl;
  }

  /**
   * Get the news article 1 image URL
   */
  getNewsArticle1Url(): string {
    return this.newsArticle1Url;
  }

  /**
   * Get the news article 2 image URL
   */
  getNewsArticle2Url(): string {
    return this.newsArticle2Url;
  }
}
