import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SessionService} from '../../services/session/session.service';
import {UserService} from '../../services/user/user.service';
import {map} from 'rxjs';
import {ThemeService} from '../../services/theme/theme.service';

@Component({
  selector: 'app-user-settings',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
  private formBuilder = inject(FormBuilder);
  private sessionService = inject(SessionService);
  form = this.formBuilder.group({
    theme: [this.sessionService.getUser()?.theme, Validators.required],
  });

  constructor(private userService: UserService,
              private themeService: ThemeService) {
    console.log(this.sessionService.getUser())
  }


  onSubmit() {
    console.log(this.form.value)
    const user_id = this.sessionService.getUser()?.id
    if (user_id == undefined) {return}
    this.userService.userSettingsUpdate(user_id, this.form.value).subscribe((status: boolean) => {
      if(status) {
        const user = this.sessionService.getUser();
        if (user == null || !this.form.value['theme']) {
          return
        }
        this.sessionService.updateUser({'theme': this.form.value['theme']})

        const currentTheme = this.themeService.getCurrentTheme()
        if (currentTheme != null && currentTheme.themeCSSID !== this.form.value['theme']) {
          this.themeService.setTheme(this.form.value['theme'])
        }
      }}
      )
  }
}
