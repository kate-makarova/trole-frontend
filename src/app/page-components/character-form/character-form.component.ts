import {Component, inject} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormsModule, Validators} from "@angular/forms";
import {Observable, of, shareReplay} from "rxjs";
import {CharacterSheet} from "../../entities/CharacterSheet";
import {CharacterSheetService} from "../../services/character-sheet/character-sheet.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-character-form',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css'
})
export class CharacterFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  characterSheet$: Observable<CharacterSheet|null> = of(null);
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

  onSubmit() {
    console.log(this.characterSheetForm.value);
  }
}
