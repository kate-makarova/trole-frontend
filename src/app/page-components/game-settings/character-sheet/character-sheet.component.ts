import {Component, inject, OnInit} from '@angular/core';
import {CharacterSheetService} from "../../../services/character-sheet/character-sheet.service";
import {BehaviorSubject, Observable, of, shareReplay} from "rxjs";
import {CharacterSheetTemplate} from "../../../entities/CharacterSheetTemplate";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {GameSettingsNavComponent} from "../game-settings-nav/game-settings-nav.component";

@Component({
  selector: 'app-character-sheet',
  imports: [
    AsyncPipe,
    NgIf,
    GameSettingsNavComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent implements OnInit {
  gameSettingsTabId: string = 'character-sheet';
  private formBuilder = inject(FormBuilder);
  characterSheetTemplate$: Observable<CharacterSheetTemplate|null> = of(null);
  gameId: number = 0;
  characterSheetForm = this.formBuilder.group({
  });
  protected formUpdateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  protected formUpdate$: Observable<boolean> = this.formUpdateSubject.asObservable();

  constructor(private characterSheetService: CharacterSheetService,
              private route: ActivatedRoute) {
    this.gameId = Number(this.route.snapshot.paramMap.get('game_id'));
  }

  ngOnInit() {
    this.characterSheetService.loadCharacterSheetTemplate(this.gameId)
    this.characterSheetTemplate$ = this.characterSheetService.getCharacterSheetTemplate().pipe(shareReplay(1));
    this.characterSheetTemplate$.subscribe(data => {
      if (data == null) {return}
      for (let field of data.fields) {
        this.characterSheetForm.addControl('order-'+field.id, this.formBuilder.control(field.order, field.is_required ? Validators.required : null))
        this.characterSheetForm.addControl('name-'+field.id, this.formBuilder.control(field.field_name, field.is_required ? Validators.required : null))
        this.characterSheetForm.addControl('description-'+field.id, this.formBuilder.control(field.description, field.is_required ? Validators.required : null))
        this.characterSheetForm.addControl('type-'+field.id, this.formBuilder.control(field.type, field.is_required ? Validators.required : null))
        this.characterSheetForm.addControl('required-'+field.id, this.formBuilder.control(field.is_required, field.is_required ? Validators.required : null))
      }
      this.formUpdateSubject.next(true)
    })
  }
  onSubmit() {
    console.log(this.characterSheetForm.value);
  }
}
