import {Component, inject} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {SessionService} from '../../services/session/session.service';
import {Router} from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgForOf} from '@angular/common';
import {of} from 'rxjs';
import {APIService} from '../../services/apiservice/apiservice.service';
import {SimpleEntity} from '../../entities/SimpleEntity';

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
export class EpisodeFormComponent {
  private formBuilder = inject(FormBuilder);
  protected readonly of = of;
  protected readonly FormControl = FormControl;

  episodeForm = this.formBuilder.group({
    name: ['', Validators.required],
    image: [''],
    description: [''],
    characters: this.formBuilder.array([this.formBuilder.control('')]),
  });

  constructor(private apiservice:APIService) {
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

  onSubmit() {
    console.log(this.episodeForm.value);
  }

}
