import {Component, Input, OnInit} from '@angular/core';
import {ScriptService} from "../script.service";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-sceditor',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sceditor.component.html',
  styleUrl: './sceditor.component.css'
})
export class SceditorComponent implements OnInit {
  @Input('id') id: string  = ''
  @Input('format') format: string = 'xhtml'
  private scripts: any[] = []
  private scriptService: ScriptService;

  constructor() {
    let format_script = 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/formats/xhtml.min.js'
    if (this.format == 'bbcode') {
      format_script = 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/formats/bbcode.min.js'
    }
    this.scripts = [
      { name: 'main', src: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/sceditor.min.js' },
      { name: 'format', src: format_script }
    ];
    this.scriptService = new ScriptService(this.scripts);
  }

  ngOnInit() {
    this.scriptService.load('main', 'format').then(() => {
      const textarea = document.getElementById(this.id);
      // @ts-ignore
      sceditor.create(textarea, {
        format: this.format,
        style: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/content/default.min.css',
        height: 300,
      });

    })
  }
}
