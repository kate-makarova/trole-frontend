import {Component, inject, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
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
  protected readonly FormControl = FormControl;
  private path: string;

  episodeForm = this.formBuilder.group({
    name: ['', Validators.required],
    image: [''],
    description: [''],
    characters: this.formBuilder.array([this.formBuilder.control(new SimpleEntity(0, ''))]),
    game: 0
  });

  constructor(private apiservice:APIService,
              private episodeService: EpisodeService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
    this.episodeForm.patchValue({game: Number(this.route.snapshot.paramMap.get('id'))})
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


  selectCharacterEvent(item: any) {
    console.log(this.episodeForm.value)
    this.dataCharacter = []
  }

  onChangeCharacterSearch(val: string) {
    if (val.length < 3) return;
    this.apiservice.autocomplete('Character', val).subscribe(data => {
      this.dataCharacter = data;
    })
  }

  onCharacterFocused(e: any){
    // do something when input is focused
  }

  ngOnInit() {
    if (this.path === 'episode-edit') {
      this.episodeService.getEpisode(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data => {
        if(data == null) {
          return;
        }
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
    this.episodeService.create(this.episodeForm.value).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/episode/'+data);
    })
  }

}
