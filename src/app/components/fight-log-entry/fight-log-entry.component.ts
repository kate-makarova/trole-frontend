import {Component, Input} from '@angular/core';
import {FightLogEntryLine} from "../../entities/FightLogEntryLine";
import {NgForOf, NgIf} from "@angular/common";
import {FightCharacter} from "../../entities/FightCharacter";
import {FightMob} from "../../entities/FightMob";
import {FightLogEntry} from "../../entities/FightLogEntry";

@Component({
  selector: 'app-fight-log-entry',
  imports: [
    NgForOf,
    NgIf,
  ],
  templateUrl: './fight-log-entry.component.html',
  styleUrl: './fight-log-entry.component.css'
})
export class FightLogEntryComponent {
  @Input('entry') entry: FightLogEntry|null = null;

  constructor() {
  }
}
