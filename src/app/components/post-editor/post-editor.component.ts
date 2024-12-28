import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../services/post/post.service';

@Component({
  selector: 'app-post-editor',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.css'
})
export class PostEditorComponent {
  postEditor = new FormControl('');
  episodeId: number = 0;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.episodeId = Number(this.route.snapshot.paramMap.get('id'));
  }

  insertTag(tag: string, index: number) {
    this.postEditor.setValue(this.postEditor.getRawValue() + tag)
  }

  onSubmit() {
    this.postService.create({episode: this.episodeId, content: this.postEditor.value}).subscribe(data => {
      console.log('new post');
    })
  }
}
