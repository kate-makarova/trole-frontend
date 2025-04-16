import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Episode} from '../../entities/Episode';
import {EpisodeService} from '../../services/episode/episode.service';
import {ActivatedRoute} from '@angular/router';
import {PostEditorComponent} from '../../components/post-editor/post-editor.component';
import {map, Observable, of, shareReplay} from 'rxjs';
import {PostService} from '../../services/post/post.service';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, ViewportScroller} from '@angular/common';
import {Post} from '../../entities/Post';
import {Title} from "@angular/platform-browser";
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {PlaceholderImageComponent} from '../../components/placeholder-image/placeholder-image.component';
import {TopButton} from '../../entities/TopButton';
import {TopButtonsComponent} from '../../components/top-buttons/top-buttons.component';
import {SafeHtmlPipe} from "../../pipes/SafeHtmlPipe";
import {PaginationComponent} from "../../components/pagination/pagination.component";
import {DraftService} from "../../services/draft/draft.service";
import {Draft} from "../../entities/Draft";
import {Character} from "../../entities/Character";
import {Fight} from "../../entities/Fight";
import {FightCharacter} from "../../entities/FightCharacter";
import {FightMob} from "../../entities/FightMob";
import {FightLogEntry} from "../../entities/FightLogEntry";
import {FightLogEntryComponent} from "../../components/fight-log-entry/fight-log-entry.component";
import {FightLogEntryLine} from "../../entities/FightLogEntryLine";
import {FightComponent} from "../../components/fight/fight.component";
import {Skill} from "../../entities/Skill";

@Component({
  selector: 'app-episode',
  imports: [
    PostEditorComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    PlaceholderImageComponent,
    NgClass,
    TopButtonsComponent,
    SafeHtmlPipe,
    PaginationComponent,
    DatePipe,
    FightLogEntryComponent,
    FightComponent,
  ],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css',
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
  topButtons: TopButton[] = []
  pageNumber: number = 1;
  deleteAlert: boolean = false;
  postToDelete: Post|null = null;
  draftsOpen: boolean = false;
  drafts$: Observable<Draft[]> = of([])
  fight: Fight|null = null;
  fightOpen: boolean = false;
  currentFightLogEntry: FightLogEntry | null = null;

  constructor(private episodeService: EpisodeService,
              private postService: PostService,
              private route: ActivatedRoute,
              private titleService: Title,
              private breadcrumbsService: BreadcrumbsService,
              private viewportScroller: ViewportScroller,
              private draftService: DraftService
              ) {

    this.fight = new Fight([
        new FightCharacter(1, 'Raphael', 666, 500, 'Bard', 12, false),
        new FightCharacter(2, 'Antilia', 300, 278, 'Bard', 14, false),
        new FightCharacter(3, 'Mephistopheles', 450, 550, 'Bard', 20, false)
    ],
        [
          new FightMob(1, 'Angel Splendid', 500, 100, 'Paladin', 12, false),
          new FightMob(2, 'Angel Righteous', 500, 0, 'Paladin', 12, true),
          new FightMob(3, 'Angel Virtuous', 500, 500, 'Paladin', 12, false)
        ],
        1, 1,
        [
            new Skill(1, 'Fireball', 'A ball of fire', 'Magic attack', 'Fire', 5, 6, 1, 1,
                '/assets/dice-icons-set-1/burning-dot.svg'),
          new Skill(2, 'Fire Breath', 'Too much hot food', 'Magic attack', 'Fire', 5, 6, 1, 1,
              '/assets/dice-icons-set-1/dragon-breath.svg'),
          new Skill(3, 'Flaming Claws', 'Devil claws, baby', 'Magic attack', 'Fire', 5, 6, 1, 1,
              '/assets/dice-icons-set-1/flaming-claw.svg'),
          new Skill(4, 'Flaming Trident', "Mephistopheles's favourite", 'Magic attack', 'Fire', 5, 6, 1, 1,
              '/assets/dice-icons-set-1/flaming-trident.svg'),
        ],
        new FightLogEntry(0, [
          new FightLogEntryLine(
              new FightCharacter(1, 'Antilia', 400, 300, 'Bard', 14, false),
              new FightMob(1, 'Angel', 500, 200, 'Paladin', 11, false),
              'hits',
              'psychic',
              20,
              'Vicious Mockery'
          )
        ])
        )

    this.currentFightLogEntry = new FightLogEntry(0, [
      new FightLogEntryLine(
          new FightCharacter(1, 'Antilia', 400, 300, 'Bard', 14, false),
          new FightMob(1, 'Angel', 500, 200, 'Paladin', 11, false),
          'hits',
          'psychic',
          20,
          'Vicious Mockery'
      )
    ])
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
      this.episodeService.addPost()
      this.pageNumber = -1; // last page
      this.postService.loadList(this.episodeId, this.pageNumber)
      this.posts$ = this.postService.getList().pipe(shareReplay(1));
    }
  }

  onPostUpdated(updated: boolean) {
    if (updated) {
      this.postService.loadList(this.episodeId, this.pageNumber)
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
      this.topButtons = []
      if (!episode) {return}
      this.titleService.setTitle(episode.name)
      if (episode.is_new) {
        this.postService.setPostsRead(this.episodeId)
      }
      if(episode.can_edit) {
          this.topButtons.push({
            path: '/episode-edit/'+this.episodeId,
            name: 'Edit Episode',
            class: 'button primary',
            id: 'top-button-edit-episode',
            click: null
      })}
     // console.log(episode)
    });
    this.postService.loadList(this.episodeId, this.pageNumber)
    this.posts$ = this.postService.getList().pipe(shareReplay(1));
    this.drafts$ = this.draftService.getList().pipe(shareReplay(1));
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

  postAlertDelete(post: Post) {
    this.postToDelete = post;
    this.deleteAlert = true;
  }

  postAlertDeleteCancel() {
    this.postToDelete = null;
    this.deleteAlert = false;
  }

  deletePost() {
    if (this.postToDelete == null) {
      this.deleteAlert = false;
      return;
    }
    this.postService.delete(this.postToDelete.id).subscribe(() => {
      this.episodeService.deletePost()
      this.postService.loadList(this.episodeId, this.pageNumber)
      this.posts$ = this.postService.getList().pipe(shareReplay(1));
      this.postToDelete = null;
      this.deleteAlert = false;
    })
  }

  reloadPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.postService.loadList(this.episodeId, this.pageNumber)
    this.posts$ = this.postService.getList().pipe(shareReplay(1));
  }

  splitScreen() {
    this.isEditorOpen = !this.isEditorOpen
    if(this.isEditorOpen) {
      this.episodeContentStyle = 'margin-right: min(48%, 820px);'
      this.postEditorStyle = 'max-width: 820px; float: right'
      this.editorButtonText = 'Close Editor'
    } else {
      this.episodeContentStyle = 'width: 100%'
      this.postEditorStyle = 'width: 0; display: none'
      this.editorButtonText = 'Open Editor'
    }
  }

  toggleDrafts() {
    this.draftsOpen = !this.draftsOpen
    if (this.draftsOpen) {
      this.draftService.loadList(this.episodeId, -1)
    }
  }

  loadDraft(id: number) {
    this.draftService.load(id)
    this.draftService.get().pipe(shareReplay(1)).subscribe((draft: Draft|null) => {
      if (draft == null) {return}
      if(!this.isEditorOpen) {
        this.splitScreen()
      }
      this.editedPost = of(new Post(
          0,
          this.episodeId,
          false,
          (new Date()).toString(),
          new Character(0, '', true),
          draft.content,
          draft.content_bb,
          true
      ))
    })
  }

  toggleFight() {
    this.fightOpen = !this.fightOpen
  }

  protected readonly Math = Math;
}
