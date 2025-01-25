import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {PageService} from '../../services/page/page.service';

@Component({
  selector: 'app-page-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './page-form.component.html',
  styleUrl: './page-form.component.css'
})
export class PageFormComponent {
  private formBuilder = inject(FormBuilder);

  pageForm = this.formBuilder.group({
      name: ['', Validators.required],
      language: ['', Validators.required],
      path: ['', Validators.required],
      content: ['', Validators.required],
    });

  constructor(private pageService: PageService) {
  }

  onSubmit() {
    console.log(this.pageForm.value)
    this.pageService.create(this.pageForm.value).subscribe((data) => {
      console.log(data)
    })
  }
}
