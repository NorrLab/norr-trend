import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTradesComponent } from './profile-trades.component';

describe('ProfileTradesComponent', () => {
  let component: ProfileTradesComponent;
  let fixture: ComponentFixture<ProfileTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
