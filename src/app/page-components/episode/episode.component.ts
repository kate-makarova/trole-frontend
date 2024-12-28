import { Component } from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute} from '@angular/router';
import {PostEditorComponent} from '../../components/post-editor/post-editor.component';
import {Observable} from 'rxjs';
import {PostService} from '../../services/post/post.service';
import {AsyncPipe} from '@angular/common';
import {Post} from '../../entities/Post';

@Component({
  selector: 'app-episode',
  imports: [
    PostEditorComponent,
    AsyncPipe
  ],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent {
  episode: Observable<Episode> | undefined;
  posts: Observable<Post[]> | undefined;
  episodeId: number = 0;

  constructor(private episodeService: EpisodeService,
              private postService: PostService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.episodeId = Number(this.route.snapshot.paramMap.get('id'));
    this.episode = this.episodeService.get(this.episodeId);
    this.posts = this.postService.getList(this.episodeId, 1);
  }
}
