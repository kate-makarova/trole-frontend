import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {SimpleEntity} from '../../entities/SimpleEntity';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Character} from '../../entities/Character';

@Component({
  selector: 'app-post-editor',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.css'
})
export class PostEditorComponent implements OnInit {

  private formBuilder = inject(FormBuilder);

  postForm = this.formBuilder.group({
    content: ['', Validators.required],
    character: [0, Validators.required],
    episode: 0
  });

  @Input('characters') characters: Observable<Character[]> | undefined;
  @Output() postAdded: EventEmitter<boolean> = new EventEmitter();

  constructor(private postService: PostService,
              private route: ActivatedRoute) {
    this.postForm.patchValue({episode: Number(this.route.snapshot.paramMap.get('id'))})
  }

  ngOnInit() {
    this.characters?.subscribe((data: Character[]) => {
      if(data !== null && data.length == 1) {
        this.postForm.controls.character.setValue(data[0].id)
      }
    })
  }

  insertTag(tag: string, index: number) {
    this.postForm.controls.content.setValue(this.postForm.controls.content.getRawValue() + tag)
  }

  chooseCharacter(character_id : number) {
    this.postForm.controls.character.setValue(character_id)
  }

  onSubmit() {
    console.log(this.postForm.value);
    this.postService.create(this.postForm.value).subscribe(data => {
      this.postForm.controls.content.setValue('')
      this.postAdded.emit(true)
    })
  }
}
