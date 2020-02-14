import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabVideoAnalyticsComponent } from './norrlab-video-analytics.component';

describe('NorrlabVideoAnalyticsComponent', () => {
  let component: NorrlabVideoAnalyticsComponent;
  let fixture: ComponentFixture<NorrlabVideoAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabVideoAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabVideoAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
