import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SessionService} from '../../services/session/session.service';
import {Router} from '@angular/router';
import {SimpleEntity} from '../../entities/SimpleEntity';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgForOf} from '@angular/common';
import {APIService} from '../../services/apiservice/apiservice.service';

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
export class GameFormComponent {

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    fandoms: this.formBuilder.array([this.formBuilder.control(new SimpleEntity(0, ''))]),
  });

  constructor(private apiservice: APIService) {

  }

  get fandoms() {
    return this.form.get('fandoms') as FormArray;
  }

  addFandom() {
    this.fandoms.push(this.formBuilder.control(''));
  }

  keywordFandom = 'name';
  dataFandom: SimpleEntity[] = [];


  selectFandomEvent() {
    this.dataFandom = []
  }

  onChangeFandomSearch(val: string) {
    if (val.length < 3) return;
    this.apiservice.autocomplete('Fandom', val).subscribe(data => {
      this.dataFandom = data;
    })
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
