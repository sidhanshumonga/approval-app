import { Action } from '@ngrx/store';

export const START_DATE_UPDATE = 'START_DATE_UPDATE';
export const END_DATE_UPDATE = 'END_DATE_UPDATE';

export const CLEAR_DATES = 'CLEAR_DATES';

export class StartDateUpdate implements Action {
    public readonly type = START_DATE_UPDATE;
    constructor(public payload: any) {}
}

export class EndDateUpdate implements Action {
    public readonly type = END_DATE_UPDATE;
    constructor(public payload: any) {}
}

export class ClearDates implements Action {
    public readonly type = CLEAR_DATES;
    constructor(public payload: any) {}
}



export type DateActions =
    | StartDateUpdate
    | EndDateUpdate
    | ClearDates;