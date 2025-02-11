import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Draft} from "../../entities/Draft";
import {DecimalPipe, NgIf} from "@angular/common";
import {DraftService} from "../../services/draft/draft.service";

@Component({
  selector: 'app-draft-autosave',
  imports: [
    NgIf,
    DecimalPipe
  ],
  templateUrl: './draft-autosave.component.html',
  styleUrl: './draft-autosave.component.css'
})
export class DraftAutosaveComponent implements OnChanges {
  protected saveInterval: any = null;
  protected timerInterval: any = null;
  protected autosaveOn: Boolean = false;
  protected draft: Draft|null = null;
  protected dateInitiate: Date|null = null;
  protected minutes = 1;
  timerValue: number = -1;
  init: Boolean = true;

  @Input('sceditorId') sceditorId: string = '';
  @Input('episodeId') episodeId: number = 0;
  @Input('characterId') characterId: number = 0;

  constructor(private draftService: DraftService) {
  }

  startAutosave() {
    this.autosaveOn = true;
    this.dateInitiate = new Date();
    this.draft = new Draft(0, this.episodeId, {id: this.characterId, name: ""}, this.dateInitiate, true, false, null)
    this.saveInterval = setInterval(() => {
      this.save()
    }, this.minutes * 60000)
    this.timerValue = this.minutes * 60
    this.timerInterval = setInterval(() => {
      this.timerValue -= 1
      if (this.timerValue == 0) {
        this.timerValue = this.minutes * 60
      }
    }, 1000)
    setTimeout(() => {
      this.init = false;
    }, 1000)
  }

  save() {
    this.draftService.create({
      "episode": this.episodeId,
      "character": this.characterId,
      "autosave": true,
      "date_initiate": this.dateInitiate
    }).subscribe(() => {
      console.log('saved')
    })
  }

  stopAutosave() {
    if(this.saveInterval == null) {return}
    this.autosaveOn = false;
    this.draft = null;
    clearInterval(this.saveInterval)
    clearInterval(this.timerInterval)
  }

  ngOnChanges(changes:SimpleChanges) {
    if(this.autosaveOn) {
      this.stopAutosave()
    }
    this.startAutosave()
  }
}
