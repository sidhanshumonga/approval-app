import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { Store } from '@ngrx/store';
import * as RootReducer from '../app.reducers';
import * as DateActions from './state/date-filter.actions';
import * as PendingListActions from '../pending-list/state/pending-list.actions';
import * as ApprovedListActions from '../approved-list/state/approved-list.actions';
import * as RejectedListActions from '../rejected-list/state/rejected-list.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {

  constructor(public store: Store<RootReducer.State>) {
  }
  startDate = '';
  endDate = '';
  ngOnInit() {
  }

  updateDate(type: string, event: MatDatepickerInputEvent<Date>) {
    const date = moment(event.value).format('YYYY-MM-DD');
    if (type === 'startDate') {
      this.startDate = date;
      this.store.dispatch(new DateActions.StartDateUpdate(date));
    } else {
      this.endDate = date;
      this.store.dispatch(new DateActions.EndDateUpdate(date));
    }

    if (this.startDate && this.endDate) {
      this.store.dispatch(new PendingListActions.FetchEventsRequest({ startDate: this.startDate, endDate: this.endDate }));
      this.store.dispatch(new ApprovedListActions.FetchApprovedEventsRequest({ startDate: this.startDate, endDate: this.endDate }));
      this.store.dispatch(new RejectedListActions.FetchRejectedEventsRequest({ startDate: this.startDate, endDate: this.endDate }));
    }
  }

}
