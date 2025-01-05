import {AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute} from '@angular/router';
import {PostEditorComponent} from '../../components/post-editor/post-editor.component';
import {map, Observable, of, shareReplay} from 'rxjs';
import {PostService} from '../../services/post/post.service';
import {AsyncPipe, NgForOf, NgIf, ViewportScroller} from '@angular/common';
import {Post} from '../../entities/Post';
import {Title} from "@angular/platform-browser";
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {PlaceholderImageComponent} from '../../components/placeholder-image/placeholder-image.component';

@Component({
  selector: 'app-episode',
  imports: [
    PostEditorComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    PlaceholderImageComponent
  ],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent implements OnInit, AfterViewInit {
  episode$: Observable<Episode> = of();
  posts$: Observable<Post[]> = of([]);
  episodeId: number = 0;

  constructor(private episodeService: EpisodeService,
              private postService: PostService,
              private route: ActivatedRoute,
              private titleService: Title,
              private breadcrumbsService: BreadcrumbsService,
              private viewportScroller: ViewportScroller,
              private cdRef: ChangeDetectorRef
              ) {

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
    this.breadcrumbsService.changeBreadcrumbs('episode', [this.episodeId]);
    this.episode$ = this.episodeService.get(this.episodeId).pipe(shareReplay(1));
    this.episode$.subscribe(episode => {
      this.titleService.setTitle(episode.name)
      if (episode.is_new) {
        this.postService.setPostsRead(this.episodeId)
      }
    });
    this.posts$ = this.postService.getList(this.episodeId, 1).pipe(shareReplay(1));
  }

  ngAfterViewInit(): void {
    this.posts$.subscribe({
      next: (data) => {
        console.log(data);
        this.cdRef.detectChanges();
        const unread_post = data.find((post) => !post.is_read)
        if (unread_post) {
          this.viewportScroller.scrollToAnchor('p'+unread_post.id);
          this.postService.setPostsRead(this.episodeId)
        }
      },
    });

  }
}
