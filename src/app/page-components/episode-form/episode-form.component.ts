import {Component, inject, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {AsyncPipe, Location, NgForOf} from '@angular/common';
import {Observable, of, share, shareReplay} from 'rxjs';
import {APIService} from '../../services/apiservice/apiservice.service';
import {SimpleEntity} from '../../entities/SimpleEntity';
import {EpisodeService} from '../../services/episode/episode.service';
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {CharacterService} from '../../services/character/character.service';
import {LanguageService} from "../../services/language/language.service";

@Component({
  selector: 'app-episode-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './episode-form.component.html',
  styleUrl: './episode-form.component.css'
})
export class EpisodeFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  protected readonly of = of;
  private path: string;
  mode: string = 'create';
  gameId: number = 0;
  episodeId: number = 0;
  episodeName: string = '';
  languages$: Observable<SimpleEntity[]> = of([])

  episodeForm = this.formBuilder.group({
    name: ['', Validators.required],
    image: [''],
    description: [''],
    characters: this.formBuilder.array([this.formBuilder.control(new SimpleEntity(0, ''))]),
    language: [0],
    game: 0,
    id: 0
  });

  constructor(private episodeService: EpisodeService,
              private characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbsService:BreadcrumbsService,
              private location: Location,
              private languageService: LanguageService) {
    this.path = this.location.path().split('/')[1];
  }

  get characters() {
    return this.episodeForm.get('characters') as FormArray;
  }

  addCharacter() {
    this.characters.push(this.formBuilder.control(''));
  }

  keywordCharacter = 'name';
  dataCharacter: SimpleEntity[] = [];


  selectCharacterEvent() {
    this.dataCharacter = []
  }

  onChangeCharacterSearch(val: string) {
    if (val.length < 3) return;
    this.characterService.characterAutocomplete(this.gameId, val).subscribe(data => {
      this.dataCharacter = data;
    })
  }

  // onCharacterFocused(e: any){
  //   // do something when input is focused
  // }

  ngOnInit() {
    if (this.path === 'episode-edit') {
      this.mode = 'edit';
      this.episodeId = Number(this.route.snapshot.paramMap.get('id'));
      this.breadcrumbsService.changeBreadcrumbs('episode-edit', [this.episodeId])
      this.episodeService.load(this.episodeId);
      this.episodeService.get().subscribe(data => {
        if(data == null) {
          return;
        }
        this.gameId = data.game_id;
        this.episodeName = data.name;
        this.languageService.loadGameLanguagesList(this.gameId)
        this.languages$ = this.languageService.getList().pipe(shareReplay(1))
        let chars = []
        for (let char of data.characters) {
          chars.push({id: char.id, name: char.name})
        }
        for (let i = 1; i<chars.length; i++) {
          this.episodeForm.controls.characters.push(this.formBuilder.control(new SimpleEntity(0, '')))
        }
        this.episodeForm.setValue({
          id: data.id,
          game: data.game_id,
          name: data.name,
          image: data.image,
          language: data.language ? data.language.id : 0,
          description: data.description,
          characters: chars
        })
      })
    } else {
      this.gameId = Number(this.route.snapshot.paramMap.get('id'))
      this.episodeForm.patchValue({game: this.gameId})
      this.languageService.loadGameLanguagesList(this.gameId)
      this.languages$ = this.languageService.getList().pipe(shareReplay(1))
      this.breadcrumbsService.changeBreadcrumbs('episode-create', [this.gameId])}
  }

  onSubmit() {
    console.log(this.episodeForm.value);
    if (this.mode === 'edit') {
      this.breadcrumbsService.changeBreadcrumbs('episode-edit', [this.episodeId])
      this.episodeService.update(this.episodeId, this.episodeForm.value).subscribe(data => {
      //  this.router.navigateByUrl('/episode/' + data);
      })
    } else {
      this.breadcrumbsService.changeBreadcrumbs('episode-create', [this.gameId])
      this.episodeService.create(this.episodeForm.value).subscribe(data => {
        this.router.navigateByUrl('/episode/' + data);
      })
    }
  }

}
