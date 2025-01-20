import {Component, inject, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SessionService} from '../../services/session/session.service';
import {Router} from '@angular/router';
import {SimpleEntity} from '../../entities/SimpleEntity';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {AsyncPipe, NgForOf} from '@angular/common';
import {APIService} from '../../services/apiservice/apiservice.service';
import {Observable, of} from 'rxjs';
import {GameService} from '../../services/game/game.service';
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {LanguageService} from "../../services/language/language.service";

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

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    fandoms: this.formBuilder.array([this.formBuilder.control(new SimpleEntity(0, ''))]),
    genres: this.formBuilder.array([this.formBuilder.control(new SimpleEntity(0, ''))]),
    languages: this.formBuilder.array([this.formBuilder.control(new SimpleEntity(0, ''))]),
    rating: ['', Validators.required],
    access_level: ['', Validators.required],
    status: ['', Validators.required]
  });
  fandom_other: boolean;
  languages$: Observable<SimpleEntity[]> = of([])

  constructor(private apiservice: APIService,
              private gameService: GameService,
              private router: Router,
              private breadcrumbsService: BreadcrumbsService,
              private languageService: LanguageService) {
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
    this.breadcrumbsService.setBreadcrumbs([{name: 'My Games', path: '/home'}, {name: 'Create Game', path: '/game-create'}])
  }

  selectFandomEvent(event: any) {
    let fandoms = this.form.getRawValue().fandoms.filter((f) => f !== null && f.id !== undefined);
    fandoms.push(event);
    const original = fandoms.filter((f) => f !== null && f.id === 1);
    this.fandom_other = original.length > 0;
  }

  onChangeFandomSearch(val: string) {
    if (val.length < 3) return;
    this.apiservice.autocomplete('Fandom', val).subscribe(data => {
      this.dataFandom = data;
    })
  }

  onSubmit() {
    this.gameService.create(this.form.value).subscribe(data => {
      this.router.navigateByUrl('/game/' + data);
    })
  }

  protected readonly of = of;
}
