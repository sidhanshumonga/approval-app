import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import * as RootReducer from '../../app.reducers';
import * as PendingListActions from './pending-list.actions';
import { ApiService } from 'src/app/api.service';


@Injectable()
export class PendingListEffects {

    @Effect()
    public fetchEventsRequest$: Observable<Action> = this.actions$.pipe(
        ofType(PendingListActions.FETCH_PENDING_EVENTS_REQUEST),
        map((action: PendingListActions.FetchEventsRequest) => action.payload),
        switchMap(payload => {
            return this.apiService.fetchEvents(payload);
        }),
        map(response =>
           new PendingListActions.FetchEventsSuccess(response)
        )
    );
    constructor(
        public actions$: Actions,
        public apiService: ApiService
    ) { }
}
