import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAnalysesComponent } from './profile-analyses.component';

describe('ProfileAnalysesComponent', () => {
  let component: ProfileAnalysesComponent;
  let fixture: ComponentFixture<ProfileAnalysesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAnalysesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAnalysesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
