import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppHeaderComponent} from './components/header/app-header.component';
import {AppFooterComponent} from './components/footer/app-footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trole-frontend';
}
