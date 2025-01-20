import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSettingsCharacterSheetComponent } from './game-settings-character-sheet.component';

describe('CharacterSheetComponent', () => {
  let component: GameSettingsCharacterSheetComponent;
  let fixture: ComponentFixture<GameSettingsCharacterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSettingsCharacterSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSettingsCharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
