import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSort, MatTableDataSource } from '@angular/material';


export interface PeriodicElement {
  mother_name: string;
  nbbd_id: string;
  status: string;
  birth_defect: string;
  reason: string;
}

const DATA: PeriodicElement[] = [
  // tslint:disable-next-line: max-line-length
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Pending for', mother_name: 'Mother name 1', reason: 'Data not complete' },
  // tslint:disable-next-line: max-line-length
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Pending for', mother_name: 'Mother name 1', reason: 'Data not complete' },
  // tslint:disable-next-line: max-line-length
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Pending for', mother_name: 'Mother name 1', reason: 'Data not complete' },
  // tslint:disable-next-line: max-line-length
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Pending for', mother_name: 'Mother name 1', reason: 'Data not complete' },
  // tslint:disable-next-line: max-line-length
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Pending for', mother_name: 'Mother name 1', reason: 'Data not complete' }
];
@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.scss']
})
export class RejectedListComponent implements OnInit {
  displayedColumns: string[] = ['nbbd_id', 'mother_name', 'birth_defect', 'status', 'reason'];
  dataSource = new MatTableDataSource(DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
