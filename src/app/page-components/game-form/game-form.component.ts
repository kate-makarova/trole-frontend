import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SessionService} from '../../services/session/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent {
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private sessionService: SessionService,
              private router: Router) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      fandom: ['', Validators.required],
      rating: ['', Validators.required],
      access_level: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  create() {}
}
