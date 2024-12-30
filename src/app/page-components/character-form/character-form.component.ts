import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterService} from '../../services/character/character.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgForOf} from '@angular/common';
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";

@Component({
  selector: 'app-character-form',
  imports: [
    AutocompleteLibModule,
    ReactiveFormsModule
  ],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css'
})
export class CharacterFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private gameId: number = 0;

  characterForm = this.formBuilder.group({
    name: ['', Validators.required],
    avatar: [''],
    description: [''],
    game: 0
  });

  constructor(private characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbsService:BreadcrumbsService
  ) {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.characterForm.patchValue({game: this.gameId})
  }

  ngOnInit() {
    this.breadcrumbsService.changeBreadcrumbs('character-create', [this.gameId])
  }

  onSubmit() {
    console.log(this.characterForm.value);
    this.characterService.create(this.characterForm.value).subscribe(data => {
      this.router.navigateByUrl('/character-list/'+this.route.snapshot.paramMap.get('id'));
    })
  }

}
