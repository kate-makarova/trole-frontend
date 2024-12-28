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
import {Location, NgForOf} from '@angular/common';
import {of} from 'rxjs';
import {APIService} from '../../services/apiservice/apiservice.service';
import {SimpleEntity} from '../../entities/SimpleEntity';
import {EpisodeService} from '../../services/episode/episode.service';
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {CharacterService} from '../../services/character/character.service';

@Component({
  selector: 'app-episode-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    NgForOf
  ],
  templateUrl: './episode-form.component.html',
  styleUrl: './episode-form.component.css'
})
export class EpisodeFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  protected readonly of = of;
  private path: string;
  protected gameName: string;
  mode: string = 'create';
  gameId: number = 0;
  episodeId: number = 0;
  episodeName: string = '';

  episodeForm = this.formBuilder.group({
    name: ['', Validators.required],
    image: [''],
    description: [''],
    characters: this.formBuilder.array([this.formBuilder.control(new SimpleEntity(0, ''))]),
    game: 0
  });

  constructor(private apiservice:APIService,
              private episodeService: EpisodeService,
              private characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbsService:BreadcrumbsService,
              private location: Location) {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'))
    this.episodeForm.patchValue({game: this.gameId})
    this.path = this.location.path().split('/')[1];
    this.gameName = this.breadcrumbsService.getItem(2).name;
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
      this.episodeService.get(this.episodeId).subscribe(data => {
        if(data == null) {
          return;
        }
        this.episodeName = data.name;
        let chars = []
        for (let char of data.characters) {
          chars.push({id: char.id, name: char.name})
        }
        this.episodeForm.setValue({
          name: data.name,
          game: data.game_id,
          image: data.image,
          description: data.description,
          characters: chars
        })
      })
    }
  }

  onSubmit() {
    console.log(this.episodeForm.value);
    if (this.mode === 'edit') {
      this.episodeService.update(this.episodeId, this.episodeForm.value).subscribe(data => {
        this.router.navigateByUrl('/episode/' + data);
      })
    } else {
      this.episodeService.create(this.episodeForm.value).subscribe(data => {
        this.router.navigateByUrl('/episode/' + data);
      })
    }
  }

}
