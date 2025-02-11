import { Injectable } from '@angular/core';
import {EntityService} from "../entity/entity.service";
import {Draft} from "../../entities/Draft";
import {SCEditorModule} from "sceditor-angular";

@Injectable({
  providedIn: 'root'
})
export class DraftService extends EntityService<Draft>{

  protected override endpoints = {
    "loadList": "draft-list/",
    "load": "draft/",
    "create": "draft-create",
    "update": "",
    "delete": ""
  }

  protected autosaveOn: Boolean = false;
  protected draft: Draft|null = null;
  protected interval: NodeJS.Timeout|null = null;

  startAutosave(sceditorId: string,
                 minutes: number,
                 episodeId: number,
                 characterId: number,
                 dateInitiate: Date) {
    this.autosaveOn = true;
    this.draft = new Draft(0, episodeId, {id: characterId, name: ""}, dateInitiate, true, false, null)
    this.interval = setInterval(() => {
      this.create({
        'episode': episodeId,
        'character': characterId,
        'dateInitiate': dateInitiate,
        'autosave': true,
        'content': SCEditorModule.getValue(sceditorId)
      })
    }, minutes * 60000)
  }

  stopAutosave() {
    if(this.interval == null) {return}
    this.autosaveOn = false;
    this.draft = null;
    clearInterval(this.interval)
  }
}
