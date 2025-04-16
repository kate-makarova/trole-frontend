import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightLogEntryComponent } from './fight-log-entry.component';

describe('FightLogEntryComponent', () => {
  let component: FightLogEntryComponent;
  let fixture: ComponentFixture<FightLogEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightLogEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightLogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
