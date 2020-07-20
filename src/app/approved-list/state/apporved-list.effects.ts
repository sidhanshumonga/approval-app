import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import * as RootReducer from '../../app.reducers';
import { ApiService } from 'src/app/api.service';
import * as ApprovedListActions from './approved-list.actions';


@Injectable()
export class ApprovedListEffects {

    @Effect()
    public fetchEventsRequest$: Observable<Action> = this.actions$.pipe(
        ofType(ApprovedListActions.FETCH_APPROVED_EVENTS_REQUEST),
        map((action: ApprovedListActions.FetchApprovedEventsRequest) => action.payload),
        withLatestFrom(this.store),
        switchMap(([payload, state]) => {
            return this.apiService.fetchCompletedEvents(payload, state.common.orgUnit);
        }),
        map(response =>
            new ApprovedListActions.FetchApprovedEventsSuccess(response)
        )
    );
    constructor(
        public actions$: Actions,
        public store: Store<RootReducer.State>,
        public apiService: ApiService
    ) { }
}
