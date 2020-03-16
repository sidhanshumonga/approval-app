import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import * as RootReducer from '../app.reducers';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  mother_name: string;
  nbbd_id: string;
  status: string;
  birth_defect: string;
}


@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.scss']
})
export class ApprovedListComponent implements OnInit {

  displayedColumns: string[] = ['nbbdId', 'motherName', 'status'];
  dataSource = new MatTableDataSource();
  loading$ = new Observable<any>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public store: Store<RootReducer.State>, public dialog: MatDialog, public apiService: ApiService) {
    this.store.select(state => state.approvedList).subscribe(data => {
      if (data.list) {
        this.dataSource = new MatTableDataSource(data.list);
      }
    });

    this.loading$ = this.store.select(state => state.rejectedList.loading);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }


}
