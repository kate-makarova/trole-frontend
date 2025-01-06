import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {SimpleEntity} from '../../entities/SimpleEntity';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Character} from '../../entities/Character';
import {PlaceholderImageComponent} from '../placeholder-image/placeholder-image.component';
import {Post} from '../../entities/Post';
import {EditorButtonsComponent} from "../editor-buttons/editor-buttons.component";

@Component({
  selector: 'app-post-editor',
    imports: [
        ReactiveFormsModule,
        AsyncPipe,
        NgIf,
        NgForOf,
        PlaceholderImageComponent,
        EditorButtonsComponent
    ],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.css'
})
export class PostEditorComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private mode = 'create';

  postForm = this.formBuilder.group({
    content: ['', Validators.required],
    character: [0, Validators.required],
    episode: 0
  });

  @Input('post') post: Post|null = null;
  @Input('characters') characters: Observable<Character[]> | undefined;
  @Output() postAdded: EventEmitter<boolean> = new EventEmitter();
  @Output() postUpdated: EventEmitter<boolean> = new EventEmitter();

  constructor(private postService: PostService,
              private route: ActivatedRoute) {
    this.postForm.patchValue({episode: Number(this.route.snapshot.paramMap.get('id'))})
  }

  ngOnInit() {
    if (this.post !== null) {
      this.postForm.controls.content.setValue(this.post.content_bb)
      this.mode = 'update'
    }
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
    console.log(this.postForm.value);
    if (this.mode == 'update' && this.post !== null) {
      this.postService.update(this.post.id, this.postForm.value).subscribe(
        () => {
          this.postUpdated.emit(true)
        }
      )
    } else {
      this.postService.create(this.postForm.value).subscribe(data => {
        this.postForm.controls.content.setValue('')
        this.postAdded.emit(true)
      })
    }
  }
}
