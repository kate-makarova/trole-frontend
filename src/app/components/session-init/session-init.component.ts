import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-session-init',
  imports: [],
  templateUrl: './session-init.component.html',
  styleUrl: './session-init.component.css'
})
export abstract class SessionInitComponent implements OnInit {
  sessionInit: Observable<boolean> = of(false);

  constructor(protected sessionService: SessionService) {
    this.sessionInit = this.sessionService.initialized.asObservable();
  }

  abstract onSessionInit(): any

  ngOnInit(): void {
    this.sessionInit.subscribe((initialized) => {
      if (!initialized) {return}
      this.onSessionInit()
    })
  }
}
