import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import * as RootReducer from '../../app.reducers';
import * as CommonActions from './common.actions';
import { ApiService } from 'src/app/api.service';


@Injectable()
export class CommonEffects {

    @Effect()
    public fetchRootOrgUnitRequest$: Observable<Action> = this.actions$.pipe(
        ofType(CommonActions.FETCH_ROOT_ORGUNIT_REQUEST),
        switchMap(payload => {
            return this.apiService.fetchLoggedInUserData();
        }),
        map(response =>
            new CommonActions.FetchRootOrgunitSuccess(response)
        )
    );

    constructor(
        public actions$: Actions,
        public apiService: ApiService,
        public store: Store<RootReducer.State>,
    ) { }
}
