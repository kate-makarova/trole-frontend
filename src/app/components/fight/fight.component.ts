import {Component, Input} from '@angular/core';
import {Fight} from "../../entities/Fight";
import {FightLogEntryComponent} from "../fight-log-entry/fight-log-entry.component";
import {NgForOf, NgIf} from "@angular/common";
import {SessionService} from "../../services/session/session.service";
import {TooltipComponent} from "../tooltip/tooltip.component";
import {SkillCardComponent} from "../skill-card/skill-card.component";
import {FightAction} from "../../entities/FightAction";
import {FightService} from "../../services/fight/fight.service";
import {Observable, of, shareReplay} from "rxjs";
import {FightLogEntry} from "../../entities/FightLogEntry";

@Component({
  selector: 'app-fight',
  imports: [
    FightLogEntryComponent,
    NgForOf,
    NgIf,
    TooltipComponent,
  ],
  templateUrl: './fight.component.html',
  styleUrl: './fight.component.css'
})
export class FightComponent {
  @Input('fight') fight: Fight|null = null;
  protected readonly Math = Math;
  usersTurn: boolean = true;
  chosenSkillId: number = 0;
  chosenMobId: number = 0;
  currentEntry$: Observable<FightLogEntry|null> = of(null)

  constructor(private sessionService: SessionService, private fightService: FightService) {
    if(this.fight && this.fight.activeUserId == this.sessionService.getUser()?.id) {
      this.usersTurn = true;
      this.currentEntry$ = of(this.fight.currentFightLogEntry)
    }
  }

  protected readonly SkillCardComponent = SkillCardComponent;

  chooseSkill(skillId: number, imgRef: HTMLImageElement) {
    if(!this.usersTurn) {
      return;
    }
    if(this.chosenSkillId == skillId) {
      this.chosenSkillId = 0;
    } else {
      this.chosenSkillId = skillId;
    }
  }

  chooseMob(mobId: number, mobRef: HTMLDivElement) {
    if(!this.usersTurn) {
      return;
    }
    if(this.chosenMobId == mobId) {
      this.chosenMobId = 0;
    } else {
      this.chosenMobId = mobId;
    }
  }

  sendLine() {
    if (this.fight == null || this.fight.currentFightLogEntry == null) {return}
    const action = new FightAction(this.fight.activeCharacterId, this.chosenSkillId, this.chosenMobId)
    this.currentEntry$ = this.fightService.sendAction(this.fight.currentFightLogEntry.id, action).pipe(shareReplay(1))
  }
}
