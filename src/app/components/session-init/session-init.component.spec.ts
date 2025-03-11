import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionInitComponent } from './session-init.component';

describe('SessionInitComponent', () => {
  let component: SessionInitComponent;
  let fixture: ComponentFixture<SessionInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionInitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
