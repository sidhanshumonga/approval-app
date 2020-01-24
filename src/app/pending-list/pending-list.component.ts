import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { RejectionPopupComponent } from '../rejection-popup/rejection-popup.component';


export interface PeriodicElement {
  mother_name: string;
  nbbd_id: string;
  status: string;
  birth_defect: string;
}

const DATA: PeriodicElement[] = [
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Pending for', mother_name: 'Mother name 1' },
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Pending for', mother_name: 'Mother name 1' },
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Pending for', mother_name: 'Mother name 1' },
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Pending for', mother_name: 'Mother name 1' },
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Pending for', mother_name: 'Mother name 1' }
];
@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PendingListComponent implements OnInit {
  displayedColumns: string[] = ['nbbd_id', 'mother_name', 'birth_defect', 'status', 'action'];
  dataSource = new MatTableDataSource(DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  updateStatus(value: string) {
    if (value === 'reject') {
      this.openDialog();
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(RejectionPopupComponent, {
      width: '40%',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
