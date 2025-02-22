import {Component, OnInit} from '@angular/core';
import {AdminNavComponent} from '../admin-nav/admin-nav.component';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {PageFormComponent} from '../../../components/page-form/page-form.component';
import {SessionService} from '../../../services/session/session.service';
import {UserService} from '../../../services/user/user.service';
import {Observable, of} from 'rxjs';
import {User} from '../../../entities/User';

@Component({
  selector: 'app-admin-user-list',
  imports: [
    AdminNavComponent,
    NgIf,
    PageFormComponent,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.css'
})
export class AdminUserListComponent implements OnInit {
  gameSettingsTabId: string = 'user-list';
  users$: Observable<User[]> = of([]);
  page: number = 1;
  constructor(protected sessionService: SessionService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.users$ = this.userService.userListAdmin(this.page);
  }
}
