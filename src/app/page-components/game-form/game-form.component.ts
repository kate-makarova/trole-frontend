import {Component, inject, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SimpleEntity} from '../../entities/SimpleEntity';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgForOf} from '@angular/common';
import {APIService} from '../../services/apiservice/apiservice.service';
import {Observable, of, shareReplay} from 'rxjs';
import {GameService} from '../../services/game/game.service';
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {LanguageService} from "../../services/language/language.service";
import {Game} from '../../entities/Game';

@Component({
  selector: 'app-game-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    NgForOf
  ],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent implements OnInit {

  @Input('gameId') gameId: number|null = null;
  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    fandoms: this.formBuilder.array([]),
    genres: this.formBuilder.array([this.formBuilder.control(0)]),
    languages: this.formBuilder.array([this.formBuilder.control(0)]),
    rating: [0, Validators.required],
    access_level: [0, Validators.required],
    status: [0, Validators.required],
    id: 0
  });
  mode: string = 'create';
  fandom_other: boolean;
  game$: Observable<Game|null> = of(null)
  languages$: Observable<SimpleEntity[]> = of([])

  constructor(private apiservice: APIService,
              private gameService: GameService,
              private router: Router,
              private breadcrumbsService: BreadcrumbsService,
              private languageService: LanguageService) {
    this.fandom_other = false;
  }

  get fandoms() {
    return this.form.get('fandoms') as FormArray;
  }

  addFandom() {
    this.fandoms.push(this.formBuilder.control(''));
  }

  get languages() {
    return this.form.get('languages') as FormArray;
  }

  addLanguage() {
    this.languages.push(this.formBuilder.control(''));
  }

  get genres() {
    return this.form.get('genres') as FormArray;
  }

  addGenre() {
    this.genres.push(this.formBuilder.control(''));
  }


  keywordFandom = 'name';
  dataFandom: SimpleEntity[] = [];
  dataRating: SimpleEntity[] = [];
  dataAccessLevel: SimpleEntity[] = [];
  dataStatus: SimpleEntity[] = [];
  dataGenre: SimpleEntity[] = [];
  dataLanguage: SimpleEntity[] = [];

  ngOnInit() {
    if (this.gameId != null) {
      this.mode = 'edit';
      this.gameService.load(this.gameId)
      this.game$ = this.gameService.get().pipe(shareReplay(1))
        this.game$.subscribe((game) => {
        if (game == null) {return}

          for (let fandom of game.fandoms) {
            this.form.controls.fandoms.push(this.formBuilder.control(new SimpleEntity(0, '')))
          }

          let genres: number[] = []
          for (let genre of game.genres) {
            genres.push(genre.id)
          }
          for (let i = 1; i<genres.length; i++) {
            this.form.controls.genres.push(this.formBuilder.control(0))
          }

          let languages: number[] = []
          for (let language of game.languages) {
            languages.push(language.id)
          }
          for (let i = 1; i<genres.length; i++) {
            this.form.controls.languages.push(this.formBuilder.control(0))
          }

          this.apiservice.getData<SimpleEntity[]>('static-list/Rating', null).subscribe(data => {
            this.dataRating = data;
            this.form.patchValue({'rating': game.rating.id})
          })
          this.apiservice.getData<SimpleEntity[]>('static-list/GameStatus', null).subscribe(data => {
            this.dataStatus = data;
            this.form.patchValue({'status': game.status.id})
          })
          this.apiservice.getData<SimpleEntity[]>('static-list/GamePermissions', null).subscribe(data => {
            this.dataAccessLevel = data;
            this.form.patchValue({'access_level': game.access_level.id})
          })
          this.apiservice.getData<SimpleEntity[]>('static-list/Genre', null).subscribe(data => {
            this.dataGenre = data;
            this.form.patchValue({'genres': genres})
          })
          this.languageService.loadList();
          this.languageService.getList().subscribe(data => {
            this.dataLanguage = data;
            this.form.patchValue({'languages': languages})
          })


        this.form.patchValue({
          id: this.gameId,
          name: game.name,
          image: game.image,
          description: game.description,
          fandoms: game.fandoms
        })
      })
    } else {
      this.breadcrumbsService.changeBreadcrumbs('game-create', [])
      this.form.controls.fandoms.push(this.formBuilder.control(new SimpleEntity(0, '')))
      this.apiservice.getData<SimpleEntity[]>('static-list/Rating', null).subscribe(data => {
        this.dataRating = data;
      })
      this.apiservice.getData<SimpleEntity[]>('static-list/GameStatus', null).subscribe(data => {
        this.dataStatus = data;
      })
      this.apiservice.getData<SimpleEntity[]>('static-list/GamePermissions', null).subscribe(data => {
        this.dataAccessLevel = data;
      })
      this.apiservice.getData<SimpleEntity[]>('static-list/Genre', null).subscribe(data => {
        this.dataGenre = data;
      })
      this.languageService.loadList();
      this.languageService.getList().subscribe(data => {
        this.dataLanguage = data;
      })
    }
  }

  selectFandomEvent(event: SimpleEntity) {
    const formValues = this.form.getRawValue();
    let fandoms = (formValues.fandoms as (SimpleEntity | null | undefined)[])
      .filter((f): f is SimpleEntity => f !== null && f !== undefined && f.id !== undefined);
    fandoms.push(event);
    const original = fandoms.filter((f) => f.id === 1);
    this.fandom_other = original.length > 0;
  }

  onChangeFandomSearch(val: string) {
    if (val.length < 3) return;
    this.apiservice.autocomplete('Fandom', val).subscribe(data => {
      this.dataFandom = data;
    })
  }

  onSubmit() {
    if(this.mode == 'edit' && this.gameId !== null) {
      this.gameService.update(this.gameId, this.form.value).subscribe((data) => {
        console.log(data)
      })
    } else {
      this.gameService.create(this.form.value).subscribe(data => {
        this.router.navigateByUrl('/game/' + data);
      })
    }
  }
}
