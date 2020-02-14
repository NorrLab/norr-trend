import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabVideoCommentsListComponent } from './norrlab-video-comments-list.component';

describe('NorrlabVideoCommentsListComponent', () => {
  let component: NorrlabVideoCommentsListComponent;
  let fixture: ComponentFixture<NorrlabVideoCommentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabVideoCommentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabVideoCommentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
