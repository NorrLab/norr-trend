import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabVideosComponent } from './norrlab-videos.component';

describe('NorrlabVideosComponent', () => {
  let component: NorrlabVideosComponent;
  let fixture: ComponentFixture<NorrlabVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
