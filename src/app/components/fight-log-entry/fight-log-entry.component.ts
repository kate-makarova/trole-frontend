import { Component } from '@angular/core';
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
  entry: FightLogEntry|null = null;

  constructor() {
    this.entry = new FightLogEntry(0, [
      new FightLogEntryLine(
          new FightCharacter(1, 'Antilia', 400, 300, 'Bard', 14, false),
          new FightMob(1, 'Angel', 500, 200, 'Paladin', 11, false),
          'hits',
          'psychic',
          20,
          'Vicious Mockery'
      )
    ])
  }
}
