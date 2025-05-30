import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsActivityComponent } from './friends-activity.component';

describe('FriendsActivityComponent', () => {
  let component: FriendsActivityComponent;
  let fixture: ComponentFixture<FriendsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
