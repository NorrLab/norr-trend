import { Component, OnInit,Inject} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-norrlab-video-dialog',
  templateUrl: './norrlab-video-dialog.component.html',
  styleUrls: ['./norrlab-video-dialog.component.css']
})
export class NorrlabVideoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NorrlabVideoDialogComponent>/*,
    @Inject(MAT_DIALOG_DATA) public data: DialogData*/) { }

  ngOnInit() {
  }

}
