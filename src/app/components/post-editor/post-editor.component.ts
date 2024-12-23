import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-post-editor',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.css'
})
export class PostEditorComponent {
  postEditor = new FormControl('');

  insertTag(tag: string, index: number) {
    this.postEditor.setValue(this.postEditor.getRawValue() + tag)
  }
}
