import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {Observable, of, Subscription} from 'rxjs';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Character} from '../../entities/Character';
import {PlaceholderImageComponent} from '../placeholder-image/placeholder-image.component';
import {Post} from '../../entities/Post';
import {SceditorComponent} from "sceditor-angular";
import {SCEditorModule} from "sceditor-angular";
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-post-editor',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    PlaceholderImageComponent,
    SceditorComponent,
    NgClass
  ],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.css'
})
export class PostEditorComponent implements OnInit, OnChanges {

  private formBuilder = inject(FormBuilder);
  private mode = 'create';
  editorMode: string = 'light'

  postForm = this.formBuilder.group({
    content: ['', Validators.required],
    character: [0, Validators.required],
    episode: 0
  });

  @Input('post') post: Observable<Post|null> = of(null);
  @Input('characters') characters: Observable<Character[]> | undefined;
  @Output() postAdded: EventEmitter<boolean> = new EventEmitter();
  @Output() postUpdated: EventEmitter<boolean> = new EventEmitter();
  postId: number|null = null;
  postContent: Observable<string|null> = of(null)

  constructor(private postService: PostService,
              protected themeService: ThemeService,
              private route: ActivatedRoute) {
    this.postForm.patchValue({episode: Number(this.route.snapshot.paramMap.get('id'))})
    this.themeService.themeName.subscribe((theme:string ) => {
        this.editorMode = theme.substring(6)
      if(this.editorMode == 'dark') {
        SCEditorModule.setCSS('postEditor', 'body{background: #000; color: #fff;} p{color: #fff;}')
      } else {
        SCEditorModule.setCSS('postEditor', 'body{color: #111;} p{color: #111;}')
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      this.post.subscribe((post) => {
        if(post == null) {return}

        this.postForm.controls.content.setValue(post.content_bb)
        this.mode = 'update'
        this.postId = post.id
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
          this.postUpdated.emit(true)
        }
      )
    } else {
      this.postService.create(this.postForm.value).subscribe(data => {
        this.postForm.controls.content.setValue('')
        this.postContent = of('')
        this.postAdded.emit(true)
      })
    }
  }

  protected readonly of = of;
  protected readonly String = String;
}
