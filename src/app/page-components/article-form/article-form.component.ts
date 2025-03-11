import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import {ArticleService} from '../../services/article/article.service';
import {Observable, of} from 'rxjs';
import {SceditorComponent, SCEditorModule} from "sceditor-angular";
import {ThemeService} from "../../services/theme/theme.service";
import {waitForElm} from "../../util/mutations";

@Component({
  selector: 'app-article-form',
  imports: [
    ReactiveFormsModule,
    SceditorComponent
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css'
})
export class ArticleFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private gameId: number = 0;
  private articleId: number = 0;
  private mode = 'create';
  editorMode: string = 'light';
  articleContent: Observable<string|null> = of(null)

  articleForm = this.formBuilder.group({
    name: ['', Validators.required],
    content: [''],
    game: 0
  });

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbsService:BreadcrumbsService,
              private themeService: ThemeService
  ) {
    this.gameId = Number(this.route.snapshot.paramMap.get('game_id'));
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.articleId > 0) {
      this.mode = 'edit';
    }
    this.articleForm.controls.game.setValue(this.gameId);
  }

  ngOnInit() {
    this.themeService.themeName.subscribe((theme:string ) => {
      waitForElm('.sceditor-container').then(() => {
        this.editorMode = theme.substring(6)
        if(this.editorMode == 'dark') {
          SCEditorModule.setCSS('articleEditor', 'body{background: #000; color: #fff;} p{color: #fff;}')
        } else {
          SCEditorModule.setCSS('articleEditor', 'body{color: #111;} p{color: #111;}')
        }
      })
    })
    if(this.mode === 'edit') {
      this.breadcrumbsService.changeBreadcrumbs('article-edit', [this.articleId])
      this.articleService.loadByGameAndId(this.gameId, this.articleId);
      this.articleService.get().subscribe(data => {
        if(data == null) {return}
        this.articleForm.controls.name.setValue(data.name);
        this.articleContent = of(data.content_bb);
      })
    } else {
      this.breadcrumbsService.changeBreadcrumbs('article-create', [this.gameId])
    }
  }

  onSubmit() {
    const content = SCEditorModule.getValue('articleEditor')
    this.articleForm.patchValue({content: content})
    console.log(this.articleForm.value);
    if(this.mode === 'edit') {
      this.articleService.update(this.articleId, this.articleForm.value).subscribe(data => {
        this.router.navigateByUrl('/article/' + this.gameId + '/' + data);
      })
    } else {
      this.articleService.create(this.articleForm.value).subscribe(data => {
        this.router.navigateByUrl('/article/' + this.gameId + '/' + data);
      })
    }
  }
}
