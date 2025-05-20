import { Component } from '@angular/core';
import {DraftAutosaveComponent} from "../components/draft-autosave/draft-autosave.component";

@Component({
  selector: 'app-test-page',
  imports: [
    DraftAutosaveComponent
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})
export class TestPageComponent {
  episodeId: number = 1;

  changeId(id: number) {
    this.episodeId = id;
  }

  save() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Saved')
        resolve("Hello, world!");
      }, 1000);
    });
  }
}
