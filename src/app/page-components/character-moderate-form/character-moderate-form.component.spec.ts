import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterModerateFormComponent } from './character-moderate-form.component';

describe('CharacterModerateFormComponent', () => {
  let component: CharacterModerateFormComponent;
  let fixture: ComponentFixture<CharacterModerateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterModerateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterModerateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
