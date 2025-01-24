import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../script.service";

@Component({
  selector: 'app-sceditor',
  imports: [],
  templateUrl: './sceditor.component.html',
  styleUrl: './sceditor.component.css'
})
export class SceditorComponent implements OnInit {
  private scripts: any[] = []
  private scriptService: ScriptService;

  constructor() {
    this.scripts = [
      { name: 'main', src: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/sceditor.min.js' },
      { name: 'bbcodes', src: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/formats/bbcode.min.js' }
    ];
    this.scriptService = new ScriptService(this.scripts);
  }

  ngOnInit() {
    this.scriptService.load('main', 'bbcodes').then(() => {
      const textarea = document.getElementById('sceditor');
      // @ts-ignore
      sceditor.create(textarea, {
        format: 'bbcode',
        style: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/content/default.min.css',
        height: 300
      });
    })
  }
}
