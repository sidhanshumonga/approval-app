import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import * as RootReducer from '../../app.reducers';
import * as PendingListActions from './pending-list.actions';
import * as RejectedListActions from '../../rejected-list/state/rejected-list.actions';
import * as ApprovedListActions from '../../approved-list/state/approved-list.actions';
import { ApiService } from 'src/app/api.service';


@Injectable()
export class PendingListEffects {

    @Effect()
    public fetchEventsRequest$: Observable<Action> = this.actions$.pipe(
        ofType(PendingListActions.FETCH_PENDING_EVENTS_REQUEST),
        map((action: PendingListActions.FetchEventsRequest) => action.payload),
        withLatestFrom(this.store),
        switchMap(([payload, state]) => {
            return this.apiService.fetchEvents(payload, state.common.orgUnit);
        }),
        map(response =>
            new PendingListActions.FetchEventsSuccess(response)
        )
    );

    @Effect()
    public updateEventRequest$: Observable<Action> = this.actions$.pipe(
        ofType(PendingListActions.UPDATE_EVENT_REQUEST),
        map((action: PendingListActions.UpdateEventRequest) => action.payload),
        switchMap(payload => {
            return this.apiService.updateEvent(payload.eventId, payload.event, payload.value);
        }),
        map(response =>
            new PendingListActions.UpdateEventSuccess()
        )
    );


    @Effect()
    public updateEventSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(PendingListActions.UPDATE_EVENT_SUCCESS),
        map((action: PendingListActions.UpdateEventSuccess) => action),
        withLatestFrom(this.store.select(state => state.dates)),
        mergeMap(([payload, state]) => [
            new PendingListActions.FetchEventsRequest(state),
            new RejectedListActions.FetchRejectedEventsRequest(state),
            new ApprovedListActions.FetchApprovedEventsRequest(state),
        ]
        )
    );

    constructor(
        public actions$: Actions,
        public apiService: ApiService,
        public store: Store<RootReducer.State>,
    ) { }
}
