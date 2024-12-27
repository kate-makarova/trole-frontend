import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterService} from '../../services/character/character.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-character-form',
  imports: [
    AutocompleteLibModule,
    ReactiveFormsModule
  ],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css'
})
export class CharacterFormComponent {
  private formBuilder = inject(FormBuilder);

  characterForm = this.formBuilder.group({
    name: ['', Validators.required],
    avatar: [''],
    description: [''],
    game: 0
  });

  constructor(private characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute) {
    this.characterForm.patchValue({game: Number(this.route.snapshot.paramMap.get('id'))})
  }

  onSubmit() {
    console.log(this.characterForm.value);
    this.characterService.create(this.characterForm.value).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/character-list/'+this.route.snapshot.paramMap.get('id'));
    })
  }

}
