import { Injectable } from '@angular/core';
import {APIService} from "../apiservice/apiservice.service";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../session/session.service";
import {Router} from "@angular/router";
import {Fight} from "../../entities/Fight";
import {Observable, of, switchMap} from "rxjs";
import {FightLogEntry} from "../../entities/FightLogEntry";
import {FightCharacter} from "../../entities/FightCharacter";
import {FightMob} from "../../entities/FightMob";
import {Skill} from "../../entities/Skill";
import {FightLogEntryLine} from "../../entities/FightLogEntryLine";

@Injectable({
  providedIn: 'root'
})
export class FightService extends APIService {

  constructor(http: HttpClient, sessionService: SessionService, router: Router) {
    super(http, sessionService, router);
  }

  loadFight(id: number): Observable<Fight> {
    return of(new Fight([
          new FightCharacter(1, 'Raphael', 666, 500, 'Bard', 12, false),
          new FightCharacter(2, 'Antilia', 300, 278, 'Bard', 14, false),
          new FightCharacter(3, 'Mephistopheles', 450, 550, 'Bard', 20, false)
        ],
        [
          new FightMob(1, 'Angel Splendid', 500, 100, 'Paladin', 12, false),
          new FightMob(2, 'Angel Righteous', 500, 0, 'Paladin', 12, true),
          new FightMob(3, 'Angel Virtuous', 500, 500, 'Paladin', 12, false)
        ],
        1, 1,
        [
          new Skill(1, 'Fireball', 'A ball of fire', 'Magic attack', 'Fire', 5, 6, 1, 1,
              '/assets/dice-icons-set-1/burning-dot.svg'),
          new Skill(2, 'Fire Breath', 'Too much hot food', 'Magic attack', 'Fire', 5, 6, 1, 1,
              '/assets/dice-icons-set-1/dragon-breath.svg'),
          new Skill(3, 'Flaming Claws', 'Devil claws, baby', 'Magic attack', 'Fire', 5, 6, 1, 1,
              '/assets/dice-icons-set-1/flaming-claw.svg'),
          new Skill(4, 'Flaming Trident', "Mephistopheles's favourite", 'Magic attack', 'Fire', 5, 6, 1, 1,
              '/assets/dice-icons-set-1/flaming-trident.svg'),
        ],
        new FightLogEntry(0, [
          new FightLogEntryLine(
              new FightCharacter(1, 'Antilia', 400, 300, 'Bard', 14, false),
              new FightMob(1, 'Angel', 500, 200, 'Paladin', 11, false),
              'hits',
              'psychic',
              20,
              'Vicious Mockery'
          )
        ])
    ))
   // return this.getData<Fight>('/fight/'+id)
  }

  loadFightLogEntries(id: number): Observable<FightLogEntry[]> {
  //  return this.getData<FightLogEntry[]>('/fight-log-entry/list/'+id)

    return of(    [new FightLogEntry(8, [
      new FightLogEntryLine(
          new FightCharacter(1, 'Antilia', 400, 300, 'Bard', 14, false),
          new FightMob(1, 'Angel', 500, 200, 'Paladin', 11, false),
          'hits',
          'psychic',
          20,
          'Vicious Mockery'
      )
    ])])
  }

  loadFightLogEntriesAsDict(id: number): Observable<any> {
    return this.loadFightLogEntries(id).pipe(
        switchMap(entries => {
          let data: any = {}
          for (let entry of entries) {
            data[entry.afterPost] = entry;
          }
          return of(data);
        })
    )
  }


}
