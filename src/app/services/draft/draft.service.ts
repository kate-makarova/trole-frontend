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
}
