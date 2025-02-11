import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftAutosaveComponent } from './draft-autosave.component';

describe('DraftAutosaveComponent', () => {
  let component: DraftAutosaveComponent;
  let fixture: ComponentFixture<DraftAutosaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftAutosaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftAutosaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
