import {Component, Input, OnInit} from '@angular/core';
import {SCEditorModule} from "sceditor-angular";
import {Observable, of} from "rxjs";
import {AsyncPipe} from "@angular/common";


@Component({
  selector: 'app-word-counter',
  imports: [
    AsyncPipe
  ],
  templateUrl: './word-counter.component.html',
  styleUrl: './word-counter.component.css'
})
export class WordCounterComponent implements OnInit {
    @Input('sceditor_initialized') sceditor_initialized: Observable<boolean> = of(false);
    character_counter$: Observable<number> = of(0);
    word_counter$: Observable<number> = of(0);


  ngOnInit() {
    this.sceditor_initialized.subscribe((initialized: boolean) => {
      if(!initialized) {return}

      SCEditorModule.setOnKeyUp('postEditor', (e: any) => {
        const t: string = SCEditorModule.getValue('postEditor');
        this.character_counter$ = of(t.length + 1);
          const word_count: number = this.calculateWorlds(t);
          this.word_counter$ = of(word_count + 1);
      })
    })
  }

  calculateWorlds(text: string): number  {
    let word_counter: number = 0;
    for (let ch of text) {
      if(ch == ' ') {
        word_counter += 1;
      }
    }
    return word_counter;
  }
}
