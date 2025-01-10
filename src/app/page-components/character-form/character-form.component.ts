import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BehaviorSubject, Observable, of, shareReplay} from "rxjs";
import {CharacterSheetTemplate} from "../../entities/CharacterSheetTemplate";
import {CharacterSheetService} from "../../services/character-sheet/character-sheet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CharacterService} from '../../services/character/character.service';
import {BreadcrumbsComponent} from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-character-form',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css'
})
export class CharacterFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  characterSheetTemplate$: Observable<CharacterSheetTemplate|null> = of(null);
  gameId: number = 0;
  characterSheetForm = this.formBuilder.group({
  });
  protected formUpdateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  protected formUpdate$: Observable<boolean> = this.formUpdateSubject.asObservable();

  constructor(private characterSheetService: CharacterSheetService,
              private route: ActivatedRoute,
              private router: Router,
              private characterService: CharacterService) {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.characterSheetForm.addControl('game', this.formBuilder.control(this.gameId))
  }

  ngOnInit() {
    this.characterSheetService.loadCharacterSheetTemplate(this.gameId)
    this.characterSheetTemplate$ = this.characterSheetService.getCharacterSheetTemplate().pipe(shareReplay(1));
    this.characterSheetTemplate$.subscribe(data => {
      if (data == null) {return}
      for (let field of data.fields) {
        this.characterSheetForm.addControl(''+field.id, this.formBuilder.control('', field.is_required ? Validators.required : null))
      }
      this.formUpdateSubject.next(true)
    })
  }

  onSubmit() {
    console.log(this.characterSheetForm.value);
    this.characterService.create(this.characterSheetForm.value).subscribe(data => {
      this.router.navigateByUrl('/character-list/'+this.route.snapshot.paramMap.get('id'));
    })
  }
}
