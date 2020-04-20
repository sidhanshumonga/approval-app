import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { ApiService } from '../api.service';
import * as RootReducer from '../app.reducers';
import { Observable } from 'rxjs';
import * as constants from '../CONSTANTS';

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.scss']
})
export class RejectedListComponent implements OnInit {
  displayedColumns: string[] = ['nbbdId', 'motherName', 'reason'];
  dataSource = new MatTableDataSource();
  public events: any;
  loading$ = new Observable<any>();
  show = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public store: Store<RootReducer.State>, public dialog: MatDialog, public apiService: ApiService) {
    this.store.select(state => state.rejectedList).subscribe(data => {
      if (data.list) {
        this.dataSource = new MatTableDataSource(data.list);
        if (data.list.length > 0 ) { this.show = true; } else { this.show = false; }
      }
    });

    this.loading$ = this.store.select(state => state.rejectedList.loading);

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  
  rowClicked(event) {
    window.open(constants.BASE_URL + constants.redirectToEvent + 'event=' + event.event.event + '&ou=' + event.event.orgUnit, '_blank' );
   }
}
