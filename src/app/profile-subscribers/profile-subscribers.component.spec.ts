import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSubscribersComponent } from './profile-subscribers.component';

describe('ProfileSubscribersComponent', () => {
  let component: ProfileSubscribersComponent;
  let fixture: ComponentFixture<ProfileSubscribersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSubscribersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
