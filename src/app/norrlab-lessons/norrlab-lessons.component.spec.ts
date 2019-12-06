import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabLessonsComponent } from './norrlab-lessons.component';

describe('NorrlabLessonsComponent', () => {
  let component: NorrlabLessonsComponent;
  let fixture: ComponentFixture<NorrlabLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
