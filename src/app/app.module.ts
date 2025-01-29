import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {BrowserModule} from '@angular/platform-browser';
import {SCEditorModule} from "sceditor-angular";
import {AdsenseModule} from "ng2-adsense";


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    SCEditorModule,
      AdsenseModule.forRoot({
        adClient: '',
        adSlot: 0
      }),
    RouterModule.forRoot(routes, {anchorScrolling: 'enabled'}),
  ],
})


export class AppModule {}
