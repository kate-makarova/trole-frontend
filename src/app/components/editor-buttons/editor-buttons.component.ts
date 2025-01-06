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
    const textarea = document.getElementById(this.id);
    const selection = window.getSelection();

    if(selection === null || selection.anchorNode !== textarea) {
      this.control.setValue(this.control.getRawValue() + openTag + closeTag);
    }
    else {
      const offset = selection.anchorOffset;
      const selectedText = selection.toString();
      const newText = this.control.getRawValue().splice(0, offset)
          + openTag + selectedText + closeTag
        + this.control.getRawValue().splice(offset + selectedText.length, this.control.getRawValue().length);
      this.control.setValue(newText);
    }
  }
}
