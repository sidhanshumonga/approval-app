import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import * as RootReducer from '../app.reducers';
import { Observable } from 'rxjs';
import * as constants from '../CONSTANTS';
import * as ApprovedListActions from './state/approved-list.actions'
import * as DateActions from '../date-filter/state/date-filter.actions'

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

  displayedColumns: string[] = ['ou', 'nbbdId', 'motherName', 'status'];
  dataSource = new MatTableDataSource();
  loading$ = new Observable<any>();
  show = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(public store: Store<RootReducer.State>, public dialog: MatDialog, public apiService: ApiService) {
    this.store.select(state => state.approvedList).subscribe(data => {
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
    this.store.dispatch(new ApprovedListActions.ClearEvents());
    this.store.dispatch(new DateActions.ClearDates(''));
  }

  rowClicked(event) {
    window.open(constants.BASE_URL + constants.redirectToEvent + 'event=' + event.event.event + '&ou=' + event.event.orgUnit, '_blank');
  }

}
