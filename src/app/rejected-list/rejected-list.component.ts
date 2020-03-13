import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { ApiService } from '../api.service';
import * as RootReducer from '../app.reducers';

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.scss']
})
export class RejectedListComponent implements OnInit {
  displayedColumns: string[] = ['nbbdId', 'motherName', 'reason'];
  dataSource = new MatTableDataSource();
  public events: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public store: Store<RootReducer.State>, public dialog: MatDialog, public apiService: ApiService) {
    this.store.select(state => state.rejectedList).subscribe(data => {
      if (data.list) {
        this.dataSource = new MatTableDataSource(data.list);
      }
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
