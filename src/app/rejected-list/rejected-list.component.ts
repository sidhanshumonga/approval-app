import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { ApiService } from '../api.service';
import * as RootReducer from '../app.reducers';
import { Observable } from 'rxjs';
import * as constants from '../CONSTANTS';
import * as RejectedListActions from './state/rejected-list.actions'
import * as DateActions from '../date-filter/state/date-filter.actions'

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.scss']
})
export class RejectedListComponent implements OnInit {
  displayedColumns: string[] = ['ou', 'nbbdId', 'motherName', 'reason'];
  dataSource = new MatTableDataSource();
  public events: any;
  loading$ = new Observable<any>();
  show = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public store: Store<RootReducer.State>, public dialog: MatDialog, public apiService: ApiService) {
    this.store.select(state => state.rejectedList).subscribe(data => {
      if (data.list) {
        let obj = [];
        let i = 0;
        for (let elm of data.list) {
          this.apiService.fetchOrgUnitPath(elm).subscribe(res => {
            // console.log(res);
            elm['ou'] = res;
            obj.push(elm);
            i++;
            if (data.list.length === i) {
              this.dataSource = new MatTableDataSource(obj);
            }
          });
        }
        if (data.list.length > 0) { this.show = true; } else { this.show = false; }
      }
    });

    this.loading$ = this.store.select(state => state.rejectedList.loading);

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.store.dispatch(new RejectedListActions.ClearEvents());
    this.store.dispatch(new DateActions.ClearDates(''));
  }
  
  rowClicked(event) {
    window.open(constants.BASE_URL + constants.redirectToEvent + 'event=' + event.event.event + '&ou=' + event.event.orgUnit, '_blank' );
   }
}
