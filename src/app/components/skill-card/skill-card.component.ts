import {Component, Input, SimpleChanges} from '@angular/core';
import {Skill} from "../../entities/Skill";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-skill-card',
  imports: [
    NgIf
  ],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.css'
})
export class SkillCardComponent {
  @Input() skill: Skill | undefined;

  ngOnChanges(changes: SimpleChanges) {
    console.log('Skill input changed:', changes);
  }
}

