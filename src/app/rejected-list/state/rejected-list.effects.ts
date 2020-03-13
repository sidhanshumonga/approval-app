import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as RejectedListActions from './rejected-list.actions';
import { ApiService } from 'src/app/api.service';


@Injectable()
export class RejectedListEffects {

    @Effect()
    public fetchEventsRequest$: Observable<Action> = this.actions$.pipe(
        ofType(RejectedListActions.FETCH_REJECTED_EVENTS_REQUEST),
        map((action: RejectedListActions.FetchRejectedEventsRequest) => action.payload),
        switchMap(payload => {
            return this.apiService.fetchRejectedEvents(payload);
        }),
        map(response =>
           new RejectedListActions.FetchRejectedEventsSuccess(response)
        )
    );
    constructor(
        public actions$: Actions,
        public apiService: ApiService
    ) { }
}
