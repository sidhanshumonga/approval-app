import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as RejectedListActions from './rejected-list.actions';
import { ApiService } from 'src/app/api.service';
import * as RootReducer from '../../app.reducers';

@Injectable()
export class RejectedListEffects {

    @Effect()
    public fetchEventsRequest$: Observable<Action> = this.actions$.pipe(
        ofType(RejectedListActions.FETCH_REJECTED_EVENTS_REQUEST),
        map((action: RejectedListActions.FetchRejectedEventsRequest) => action.payload),
        withLatestFrom(this.store),
        switchMap(([payload, state]) => {
            return this.apiService.fetchRejectedEvents(payload, state.common.orgUnit);
        }),
        map(response =>
            new RejectedListActions.FetchRejectedEventsSuccess(response)
        )
    );
    constructor(
        public actions$: Actions,
        public apiService: ApiService,
        public store: Store<RootReducer.State>,
    ) { }
}
