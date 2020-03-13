import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import * as RootReducer from '../../app.reducers';


@Injectable()
export class DateFilterEffects {


    constructor(
        public actions$: Actions,
    ) { }
}
