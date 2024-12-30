import {Component, OnInit} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute} from '@angular/router';
import {PostEditorComponent} from '../../components/post-editor/post-editor.component';
import {map, Observable, of, shareReplay} from 'rxjs';
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
export class EpisodeComponent implements OnInit {
  episode$: Observable<Episode> = of();
  posts$: Observable<Post[]> = of([]);
  episodeId: number = 0;

  constructor(private episodeService: EpisodeService,
              private postService: PostService,
              private route: ActivatedRoute) {

  }

  getMyCharacters() {
    let t = this.episode$?.pipe(shareReplay(1)).pipe(
      map((episode) => episode.characters.filter((ch) => ch.is_mine == true))
    );
    return t;
  }

  onPostAdded(added: boolean) {
    if (added) {
      this.posts$ = this.postService.getList(this.episodeId, 1).pipe(shareReplay(1));
    }
  }

  ngOnInit() {
    this.episodeId = Number(this.route.snapshot.paramMap.get('id'));
    this.episode$ = this.episodeService.get(this.episodeId).pipe(shareReplay(1));
    this.posts$ = this.postService.getList(this.episodeId, 1).pipe(shareReplay(1));
  }
}
