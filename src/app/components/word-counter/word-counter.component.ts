import {Component} from '@angular/core';
import {SCEditorModule} from "sceditor-angular";


@Component({
  selector: 'app-word-counter',
  imports: [],
  templateUrl: './word-counter.component.html',
  styleUrl: './word-counter.component.css'
})
export class WordCounterComponent {


  ngOnInit() {
    SCEditorModule.setOnKeyUp('postEditor', (e: any) => {
      console.log(e)
    })
  }
}
