import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { RejectionPopupComponent } from '../rejection-popup/rejection-popup.component';
import { ApiService } from '../api.service';
import { Store } from '@ngrx/store';
import * as RootReducer from '../app.reducers';
import * as PendingListActions from './state/pending-list.actions';
import { Observable } from 'rxjs';
import * as constants from '../CONSTANTS';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PendingListComponent implements OnInit {
  displayedColumns: string[] = ['nbbdId', 'motherName', 'action'];
  dataSource = new MatTableDataSource();
  public events: any;
  loading$ = new Observable<any>();

  show = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public store: Store<RootReducer.State>, public dialog: MatDialog, public apiService: ApiService, public router: Router) {
    this.store.select(state => state.pendingList).subscribe(data => {
      if (data.list) {
        this.dataSource = new MatTableDataSource(data.list);
        if (data.list.length > 0 ) { this.show = true; } else { this.show = false; }
      }
    });

    this.loading$ = this.store.select(state => state.pendingList.loading);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  updateStatus(value: string, event: any) {
    if (value === 'reject') {
      this.openDialog(event);
    } else {
      this.store.dispatch(new PendingListActions.UpdateEventRequest({
        eventId: event.event,
        // tslint:disable-next-line: object-literal-shorthand
        event: event,
        value: { val: '1', reason: '' }
      }));
    }
  }


  openDialog(event: any): void {
    const dialogRef = this.dialog.open(RejectionPopupComponent, {
      width: '40%',
      height: 'auto'
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new PendingListActions.UpdateEventRequest({
          eventId: event.event,
          // tslint:disable-next-line: object-literal-shorthand
          event: event,
          value: { val: '2', reason: result }
        }));
      }
    });
  }

  rowClicked(event) {
   window.open(constants.BASE_URL + constants.redirectToEvent + 'event=' + event.event.event + '&ou=' + event.event.orgUnit, '_blank' );
  }
}
