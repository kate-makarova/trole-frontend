import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SceditorComponent} from "./sceditor/sceditor.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SceditorComponent
  ],
  exports: [
    SceditorComponent
  ]
})
export class SCEditorModule {
}
