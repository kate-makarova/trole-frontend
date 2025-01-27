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
  public static getValue(id: string): string {
    const textarea = document.getElementById(id);
    // @ts-ignore
    return sceditor.instance(textarea).val();
  }
}
