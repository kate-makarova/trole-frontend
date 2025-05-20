import {Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {BehaviorSubject, Observable, of, Subject, takeUntil} from 'rxjs';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Character} from '../../entities/Character';
import {PlaceholderImageComponent} from '../placeholder-image/placeholder-image.component';
import {Post} from '../../entities/Post';
import {SceditorComponent} from "sceditor-angular";
import {SCEditorModule} from "sceditor-angular";
import {ThemeService} from "../../services/theme/theme.service";
import {DraftAutosaveComponent} from '../draft-autosave/draft-autosave.component';
import {WordCounterComponent} from "../word-counter/word-counter.component";

@Component({
  selector: 'app-post-editor',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    PlaceholderImageComponent,
    SceditorComponent,
    NgClass,
    DraftAutosaveComponent,
    WordCounterComponent,
  ],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.css'
})
export class PostEditorComponent implements OnInit, OnChanges {

  private formBuilder = inject(FormBuilder);
  private mode = 'create';
  editorMode: string = 'light'
  episodeId: number = 0

  postForm = this.formBuilder.group({
    content: ['', Validators.required],
    character: [0, Validators.required],
    episode: 0
  });

  @Input('opened') opened: Boolean = false;
  @Input('post') post: Observable<Post|null> = of(null);
  @Input('characters') characters: Observable<Character[]> | undefined;
  @Output() postAdded: EventEmitter<boolean> = new EventEmitter();
  @Output() postUpdated: EventEmitter<boolean> = new EventEmitter();
  postId: number|null = null;
  postContent: Observable<string|null> = of(null)
  sceditor_initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private postService: PostService,
              protected themeService: ThemeService,
              private route: ActivatedRoute) {
    this.episodeId = Number(this.route.snapshot.paramMap.get('id'))
    this.postForm.patchValue({episode: this.episodeId})
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      this.post.subscribe((post) => {
        if(post == null) {return}

        this.postForm.controls.content.setValue(post.content_bb)
        if(post.id !== 0) {
          this.mode = 'update'
          this.postId = post.id
        }
        this.postContent = of(post.content_bb)
      });
    }
  }

  ngOnInit() {
    this.characters?.subscribe((data: Character[]) => {
      if(data !== null && data.length == 1) {
        this.postForm.controls.character.setValue(data[0].id)
      }
    })
  }

  chooseCharacter(character_id : number) {
    this.postForm.controls.character.setValue(character_id)
  }

  onSubmit() {
    const content = SCEditorModule.getValue('postEditor')
    this.postForm.patchValue({content: content})

    console.log(this.postForm.value);

    if (this.mode == 'update' && this.postId !== null) {
      this.postService.update(this.postId, this.postForm.value).subscribe(
        () => {
          this.postForm.controls.content.setValue('')
          this.postContent = of('')
          this.postId = null;
          this.mode = 'create';
          SCEditorModule.setValue('postEditor', '')
          this.postUpdated.emit(true)
        }
      )
    } else {
      this.postService.create(this.postForm.value).subscribe(data => {
        this.postForm.controls.content.setValue('')
        this.postContent = of('')
        SCEditorModule.setValue('postEditor', '')
        this.postAdded.emit(true)
      })
    }
  }

  onSceditorInitialized($event: boolean) {
    if($event) {
      this.themeService.themeName.subscribe((theme: string) => {
        this.editorMode = theme.substring(6)
        if (this.editorMode == 'dark') {
          SCEditorModule.setCSS('postEditor', 'body{background: #000; color: #fff;} p{color: #fff;}')
        } else {
          SCEditorModule.setCSS('postEditor', 'body{color: #111;} p{color: #111;}')
        }
      })
      console.log('Initialized');
      this.sceditor_initialized.next(true);
    }
  }

  protected readonly Number = Number;
}
