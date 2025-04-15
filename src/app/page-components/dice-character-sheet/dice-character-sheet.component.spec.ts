import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceCharacterSheetComponent } from './dice-character-sheet.component';

describe('DiceCharacterSheetComponent', () => {
  let component: DiceCharacterSheetComponent;
  let fixture: ComponentFixture<DiceCharacterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceCharacterSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceCharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
