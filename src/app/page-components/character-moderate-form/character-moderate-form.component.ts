import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {Character} from "../../entities/Character";
import {Observable, of} from "rxjs";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbsService} from "../../services/breadcrubs/breadcrumbs.service";
import {CharacterService} from "../../services/character/character.service";

@Component({
  selector: 'app-character-moderate-form',
    imports: [
        AsyncPipe,
        NgIf,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './character-moderate-form.component.html',
  styleUrl: './character-moderate-form.component.css'
})
export class CharacterModerateFormComponent implements OnInit {
    private formBuilder = inject(FormBuilder);
    character$: Observable<Character|null> = of(null);
    characterId: number;
    characterModerateForm = this.formBuilder.group({
        status: ["-1", Validators.required],
        character: 0
    });

    constructor(private characterService: CharacterService,
                private route: ActivatedRoute,
                private breadcrumbsService:BreadcrumbsService
    ) {
        this.characterId = Number(this.route.snapshot.paramMap.get('id'));
        this.characterModerateForm.controls.character.setValue(this.characterId);
    }

    ngOnInit() {
        this.characterService.load(this.characterId);
        this.character$ = this.characterService.get();
        this.character$.subscribe((character: Character|null) => {
            if(character == null) {return}
            this.characterModerateForm.setValue({character: this.characterId, status: character.status.toString()})
        })
    }

    onSubmit() {
        this.characterService.update(this.characterId, this.characterModerateForm.value).subscribe((data) => {
            console.log(data);
        });
    }
}
