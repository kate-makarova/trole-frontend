import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SessionService} from '../../services/session/session.service';
import {Router} from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@Component({
  selector: 'app-episode-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  templateUrl: './episode-form.component.html',
  styleUrl: './episode-form.component.css'
})
export class EpisodeFormComponent {
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private sessionService: SessionService,
              private router: Router) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      fandom: ['', Validators.required]
    });
  }

  create() {}

  keyword = 'name';
  data = [
    {
      id: 1,
      name: 'D&D'
    },
    {
      id: 2,
      name: "Baldur's Gate III"
    },
    {
      id: 3,
      name: 'Dragon Age'
    }
  ];


  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any){
    // do something when input is focused
  }
}
