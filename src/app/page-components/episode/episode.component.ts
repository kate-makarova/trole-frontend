import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute} from '@angular/router';
import {PostEditorComponent} from '../../components/post-editor/post-editor.component';
import {map, Observable, of, shareReplay} from 'rxjs';
import {PostService} from '../../services/post/post.service';
import {AsyncPipe, NgClass, NgForOf, NgIf, ViewportScroller} from '@angular/common';
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
    PlaceholderImageComponent,
    NgClass,
  ],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css'
})
export class EpisodeComponent implements OnInit, AfterViewInit {
  episode$: Observable<Episode|null> = of(null);
  posts$: Observable<Post[]> = of([]);
  episodeId: number = 0;
  episodeContentStyle: string = 'width: 100%'
  postEditorStyle: string = 'width: 0; display: none'
  editorButtonText: string = 'Open Editor'
  isEditorOpen: boolean = false
  editedPost: Observable<Post|null> = of(null)


  constructor(private episodeService: EpisodeService,
              private postService: PostService,
              private route: ActivatedRoute,
              private titleService: Title,
              private breadcrumbsService: BreadcrumbsService,
              private viewportScroller: ViewportScroller
              ) {

  }

  getMyCharacters() {
    return this.episode$?.pipe(shareReplay(1)).pipe(
        map((episode) => {
          if (!episode) {
            return []
          }
          return episode.characters.filter((ch) => ch.is_mine)
        })
    );
  }

  onPostAdded(added: boolean) {
    if (added) {
      this.postService.loadList(this.episodeId, 1)
      this.posts$ = this.postService.getList().pipe(shareReplay(1));
    }
  }

  onPostUpdated(updated: boolean) {
    if (updated) {
      this.postService.loadList(this.episodeId, 1)
      this.posts$ = this.postService.getList().pipe(shareReplay(1));
    }
  }

  ngOnInit() {
    this.episodeId = Number(this.route.snapshot.paramMap.get('id'));
    this.breadcrumbsService.changeBreadcrumbs('episode', [this.episodeId]);
    this.episodeService.load(this.episodeId);
   // this.episodeService.loadTest();
    this.episode$ = this.episodeService.get().pipe(shareReplay(1));
    this.episode$.subscribe(episode => {
      if (!episode) {return}
      this.titleService.setTitle(episode.name)
      if (episode.is_new) {
        this.postService.setPostsRead(this.episodeId)
      }
     // console.log(episode)
    });
    this.postService.loadList(this.episodeId, 1)
    this.posts$ = this.postService.getList().pipe(shareReplay(1));
  }

  ngAfterViewInit(): void {
    this.posts$.subscribe({
      next: (data) => {
        const unread_post = data.find((post) => !post.is_read)
        if (unread_post) {
          this.waitForElm('#p'+unread_post.id).then(() => {
            this.viewportScroller.scrollToAnchor('p'+unread_post.id);
          })
          this.postService.setPostsRead(this.episodeId)
        }
      },
    });
  }

  waitForElm(selector: string) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  editPost(post: Post) {
    post.edit = true;
    this.editedPost = of(post)
    if(!this.isEditorOpen) {
       this.splitScreen()
    }
  }

  splitScreen() {
    this.isEditorOpen = !this.isEditorOpen
    if(this.isEditorOpen) {
      this.episodeContentStyle = 'margin-right: min(48%, 820px);'
      this.postEditorStyle = 'width: 48%; max-width: 820px; float: right'
      this.editorButtonText = 'Close Editor'
    } else {
      this.episodeContentStyle = 'width: 100%'
      this.postEditorStyle = 'width: 0; display: none'
      this.editorButtonText = 'Open Editor'
    }
  }
}
