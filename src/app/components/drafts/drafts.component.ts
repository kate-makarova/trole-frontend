import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable, of, shareReplay} from "rxjs";
import {Draft} from "../../entities/Draft";
import {DraftService} from "../../services/draft/draft.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {SCEditorModule} from "sceditor-angular";

@Component({
  selector: 'app-drafts',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './drafts.component.html',
  styleUrl: './drafts.component.css'
})
export class DraftsComponent implements OnChanges, OnInit {
  drafts$: Observable<Draft[]> = of([])
  draft$: Observable<Draft|null> = of(null);
  @Input('episodeId') episodeId: number = 0;
  @Input('sceditorId') sceditorId: string = '';
  page: number = -1;

  constructor(private draftService: DraftService) {
  }

  useDraft(draftId: number) {
    this.draftService.load(draftId)
    this.draft$.subscribe((draft: Draft|null) => {
      if(draft == null) {return}
      SCEditorModule.setValue(this.sceditorId, draft.content_bb)
    })
  }

  ngOnInit() {
    this.draftService.loadList(this.episodeId, this.page)
    this.drafts$ = this.draftService.getList().pipe(shareReplay(1));
  }

  ngOnChanges() {
    this.draftService.loadList(this.episodeId, this.page)
   this.drafts$ = this.draftService.getList().pipe(shareReplay(1));
  }
}
