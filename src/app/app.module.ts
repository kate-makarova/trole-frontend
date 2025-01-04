import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
@NgModule({
    imports: [
    ReactiveFormsModule,
      AutocompleteLibModule,
      RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})
],
})
export class AppModule {}
