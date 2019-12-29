import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabVideoDialogComponent } from './norrlab-video-dialog.component';

describe('NorrlabVideoDialogComponent', () => {
  let component: NorrlabVideoDialogComponent;
  let fixture: ComponentFixture<NorrlabVideoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabVideoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
