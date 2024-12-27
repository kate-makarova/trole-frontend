import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
@NgModule({
    imports: [
    ReactiveFormsModule,
      AutocompleteLibModule,
],
})
export class AppModule {}
