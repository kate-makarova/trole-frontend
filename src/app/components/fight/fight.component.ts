import {Component, Input} from '@angular/core';
import {Fight} from "../../entities/Fight";
import {FightLogEntryComponent} from "../fight-log-entry/fight-log-entry.component";
import {NgForOf, NgIf} from "@angular/common";
import {SessionService} from "../../services/session/session.service";
import {TooltipComponent} from "../tooltip/tooltip.component";
import {SkillCardComponent} from "../skill-card/skill-card.component";
import {Skill} from "../../entities/Skill";

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

  constructor(private sessionService: SessionService) {
    if(this.fight?.activeUserId == this.sessionService.getUser()?.id) {
      this.usersTurn = true;
    }
  }

  getSkillCard(skill: Skill) {
    return SkillCardComponent;
  }

  protected readonly SkillCardComponent = SkillCardComponent;
}
