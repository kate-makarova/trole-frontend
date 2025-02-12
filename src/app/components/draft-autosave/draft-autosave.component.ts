import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Draft} from "../../entities/Draft";
import {DecimalPipe, NgClass, NgIf} from "@angular/common";
import {DraftService} from "../../services/draft/draft.service";
import {SCEditorModule} from 'sceditor-angular';
import {of} from 'rxjs';

@Component({
  selector: 'app-draft-autosave',
  imports: [
    NgIf,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './draft-autosave.component.html',
  styleUrl: './draft-autosave.component.css'
})
export class DraftAutosaveComponent implements OnChanges {
  protected timerInterval: any = null;
  protected autosaveOn: Boolean = false;
  protected draft: Draft|null = null;
  protected dateInitiate: Date|null = null;
  protected minutes = 1;
  timerValue: number = -1;
  init: Boolean = true;
  mode: string = 'Stop';
  manualMode: string = 'save';
  empty: Boolean = true;

  @Input('sceditorId') sceditorId: string = '';
  @Input('episodeId') episodeId: number = 0;
  @Input('characterId') characterId: number = 0;

  constructor(private draftService: DraftService) {
  }

  startAutosave() {
    this.autosaveOn = true;
    this.dateInitiate = new Date();
    this.draft = new Draft(0, this.episodeId, {id: this.characterId, name: ""}, this.dateInitiate, new Date(), true, false, null)
    this.timerValue = this.minutes * 60
    this.timerInterval = setInterval(() => {
      this.timerValue -= 1
      if (this.timerValue == 0) {
        this.save().subscribe(() => {
          console.log('saved')
        })
        this.timerValue = this.minutes * 60
      }
    }, 1000)
    setTimeout(() => {
      this.init = false;
    }, 1000)
  }

  saveManually() {
    this.manualMode = 'wait'
    this.save(false).subscribe(() => {
      this.manualMode = 'saved'
      setTimeout(() => {
        this.manualMode = 'save'
      }, 2000)
    })
  }

  save(auto=true) {
    const value = SCEditorModule.getValue(this.sceditorId)
    if (value.length) {
      this.empty = false
      return this.draftService.create({
        "episode": this.episodeId,
        "character": this.characterId,
        "autosave": auto,
        "initiated": this.dateInitiate,
        "content": value
      })
    } else {
      this.empty = true
      return of(0)
    }
  }

  stopAutosave() {
    if(this.timerInterval == null) {return}
    this.autosaveOn = false;
    clearInterval(this.timerInterval)
    this.timerValue = 0
    this.init = true
  }

  restartAutosave() {
    this.autosaveOn = true;

    this.timerValue = this.minutes * 60

    this.timerInterval = setInterval(() => {
      this.timerValue -= 1
      if (this.timerValue == 0) {
        this.save().subscribe(() => {
          console.log('saved')
        })
        this.timerValue = this.minutes * 60
      }
    }, 1000)
    setTimeout(() => {
      this.init = false;
    }, 1000)
  }

  toggleAutosave() {
    if(this.mode == 'Stop') {
      this.stopAutosave()
      this.mode = 'Restart'
    } else {
      this.restartAutosave()
      this.mode = 'Stop'
    }
  }

  ngOnChanges(changes:SimpleChanges) {
    //todo save before character switch
    if(this.autosaveOn) {
      this.stopAutosave()
    }
    this.startAutosave()
  }

  protected readonly encodeURI = encodeURI;
}
