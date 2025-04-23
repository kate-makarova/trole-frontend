import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BehaviorSubject, Observable, of, shareReplay} from "rxjs";
import {CharacterSheetTemplate} from "../../entities/CharacterSheetTemplate";
import {CharacterSheetService} from "../../services/character-sheet/character-sheet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CharacterService} from '../../services/character/character.service';
import {BreadcrumbsComponent} from '../../components/breadcrumbs/breadcrumbs.component';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import {Character} from '../../entities/Character';
import {CharacterSheet} from '../../entities/CharacterSheet';

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
  characterSheet$: Observable<CharacterSheet|null> = of(null);
  gameId: number = 0;
  characterSheetForm = this.formBuilder.group({
  });
  protected formUpdateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  protected formUpdate$: Observable<boolean> = this.formUpdateSubject.asObservable();
  public mode: string = 'create';
  public characterId: number = 0;
  public characterName$: Observable<string> = of('')

  constructor(private characterSheetService: CharacterSheetService,
              private route: ActivatedRoute,
              private router: Router,
              private breadcrumbsService: BreadcrumbsService,
              private characterService: CharacterService) {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.characterSheetForm.addControl('game', this.formBuilder.control(this.gameId))

    const urlSegments = this.router.url.split('/');
    const baseRoute = urlSegments[1];
    console.log(baseRoute)
    if(baseRoute == 'character-edit') {
      this.mode = 'update';
    }

    if(this.mode == 'update') {
      this.characterId = Number(this.route.snapshot.paramMap.get('character_id'));
    }
  }

  ngOnInit() {
    this.characterSheetService.loadCharacterSheetTemplate(this.gameId)
    this.breadcrumbsService.changeBreadcrumbs('character-create', [this.gameId])
    this.characterSheetTemplate$ = this.characterSheetService.getCharacterSheetTemplate().pipe(shareReplay(1));
    this.characterSheetTemplate$.subscribe(data => {
      if (data == null) {return}
      console.log(data)
      for (let field of data.fields) {
        this.characterSheetForm.addControl(''+field.id, this.formBuilder.control('', field.is_required ? Validators.required : null))
      }
      this.formUpdateSubject.next(true)
    })

    if(this.mode == 'update') {
      this.characterSheetService.loadCharacterSheet(this.characterId);
      this.characterSheet$ = this.characterSheetService.getCharacterSheet().pipe(shareReplay(1));
      this.characterSheet$.subscribe((data: CharacterSheet | null) => {
        if (data == null) {
          return
        }
        this.characterName$ = of(data.fields.find((item) => {return item.field_name == 'name'})?.value ?? '')
        for (let field of data.fields) {
          this.characterSheetForm.get(''+field.id)?.setValue(field.value)
        }
      })
    }

  }

  onSubmit() {
    console.log(this.characterSheetForm.value);
    if(this.mode == 'create') {
      this.characterService.create(this.characterSheetForm.value).subscribe(data => {
        this.router.navigateByUrl('/character/' + data);
      })
    } else {
      this.characterService.update(this.characterId, this.characterSheetForm.value).subscribe(data => {
        this.router.navigateByUrl('/character/' + this.characterId);
      })
    }
  }
}
