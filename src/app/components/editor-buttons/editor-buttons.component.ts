import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";
@Component({
  selector: 'app-editor-buttons',
  imports: [],
  templateUrl: './editor-buttons.component.html',
  styleUrl: './editor-buttons.component.css'
})
export class EditorButtonsComponent {
  @Input('control') control: AbstractControl | undefined
  @Input('id') id: string  = ''
  insertTag(openTag: string,  closeTag: string) {
    if(!this.control) return;
  //  const textarea = document.getElementById(this.id);

   // console.log(textarea)
    const selection = window.getSelection();

    if(selection === null) {
      console.log('no?')
      this.control.setValue(this.control.getRawValue() + openTag + closeTag);
    }
    else {
      console.log('yes')
      const offset = selection.anchorOffset;
      const selectedText = selection.toString();
      const newText = this.control.getRawValue().toString().slice(0, offset)
          + openTag + selectedText + closeTag
        + this.control.getRawValue().slice(offset + selectedText.length, this.control.getRawValue().length);
      this.control.setValue(newText);
    }
  }
}
