import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeFormComponent } from './episode-form.component';

describe('EpisodeFormComponent', () => {
  let component: EpisodeFormComponent;
  let fixture: ComponentFixture<EpisodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
