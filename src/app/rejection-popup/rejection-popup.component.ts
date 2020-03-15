import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-rejection-popup',
  templateUrl: './rejection-popup.component.html',
  styleUrls: ['./rejection-popup.component.scss']
})
export class RejectionPopupComponent implements OnInit {
  reason = '';
  constructor(
    public dialogRef: MatDialogRef<RejectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
