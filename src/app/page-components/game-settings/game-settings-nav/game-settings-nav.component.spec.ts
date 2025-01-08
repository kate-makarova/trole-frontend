import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSettingsNavComponent } from './game-settings-nav.component';

describe('GameSettingsNavComponent', () => {
  let component: GameSettingsNavComponent;
  let fixture: ComponentFixture<GameSettingsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSettingsNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSettingsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
