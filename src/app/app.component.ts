import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AppHeaderComponent} from './app-header/app-header.component';
import {AppFooterComponent} from './app-footer/app-footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, AppHeaderComponent, AppFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trole-frontend';
}
