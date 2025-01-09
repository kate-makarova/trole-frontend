import {Component, inject, OnInit} from '@angular/core';
import {CharacterSheetService} from "../../../services/character-sheet/character-sheet.service";
import {Observable, of, shareReplay} from "rxjs";
import {CharacterSheetTemplate} from "../../../entities/CharacterSheetTemplate";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";
import {GameSettingsNavComponent} from "../game-settings-nav/game-settings-nav.component";

@Component({
  selector: 'app-character-sheet',
  imports: [
    AsyncPipe,
    NgIf,
    GameSettingsNavComponent
  ],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent implements OnInit {
  gameSettingsTabId: string = 'character-sheet';
  private formBuilder = inject(FormBuilder);
  characterSheet$: Observable<CharacterSheetTemplate|null> = of(null);
  gameId: number = 0;
  characterSheetForm = this.formBuilder.group({
  });

  constructor(private characterSheetService: CharacterSheetService,
              private route: ActivatedRoute) {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.characterSheetService.load(this.gameId)
    this.characterSheet$.subscribe(data => {
      if (data == null) {return}
      this.characterSheetForm.addControl('id', this.formBuilder.control(data?.id, Validators.required))
      for (let field of data.fields) {
        this.characterSheetForm.addControl('field-'+field.id, this.formBuilder.control('', field.is_required ? Validators.required : null))
      }
    })
    this.characterSheet$ = this.characterSheetService.get().pipe(shareReplay(1));
  }
}
