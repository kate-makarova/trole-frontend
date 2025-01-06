import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbsService} from '../../services/breadcrubs/breadcrumbs.service';
import {ArticleService} from '../../services/article/article.service';
import {Article} from '../../entities/Article';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-article-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css'
})
export class ArticleFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private gameId: number = 0;
  private articleId: number = 0;
  private mode = 'create';

  articleForm = this.formBuilder.group({
    name: ['', Validators.required],
    content: [''],
    game: 0
  });

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbsService:BreadcrumbsService
  ) {
    this.gameId = Number(this.route.snapshot.paramMap.get('game_id'));
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.articleId > 0) {
      this.mode = 'edit';
    }
    this.articleForm.controls.game.setValue(this.gameId);
  }

  ngOnInit() {
    if(this.mode === 'edit') {
      this.breadcrumbsService.changeBreadcrumbs('article-edit', [this.articleId])
      this.articleService.loadByGameAndId(this.gameId, this.articleId);
      this.articleService.get().subscribe(data => {
        if(data == null) {return}
        this.articleForm.controls.content.setValue(data.content_bb);
        this.articleForm.controls.name.setValue(data.name);
      })
    } else {
      this.breadcrumbsService.changeBreadcrumbs('article-create', [this.gameId])
    }
  }

  onSubmit() {
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
