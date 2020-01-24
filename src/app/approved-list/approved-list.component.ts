import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSort, MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  mother_name: string;
  nbbd_id: string;
  status: string;
  birth_defect: string;
}

const DATA: PeriodicElement[] = [
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Approved', mother_name: 'Mother name 1' },
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Approved', mother_name: 'Mother name 1' },
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Approved', mother_name: 'Mother name 1' },
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Approved', mother_name: 'Mother name 1' },
  { nbbd_id: 'NBBD-192-232134-201', birth_defect: 'Q001.1', status: 'Approved', mother_name: 'Mother name 1' }
];

@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.scss']
})
export class ApprovedListComponent implements OnInit {

  displayedColumns: string[] = ['nbbd_id', 'mother_name', 'birth_defect', 'status'];
  dataSource = new MatTableDataSource(DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }


}
