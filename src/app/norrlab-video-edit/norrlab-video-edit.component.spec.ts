import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabVideoEditComponent } from './norrlab-video-edit.component';

describe('NorrlabVideoEditComponent', () => {
  let component: NorrlabVideoEditComponent;
  let fixture: ComponentFixture<NorrlabVideoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabVideoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabVideoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
