import { Action } from '@ngrx/store';

export const REJECTED_LIST_UPDATE = 'REJECTED_LIST_UPDATE';
export const FETCH_REJECTED_EVENTS_REQUEST = 'FETCH_REJECTED_EVENTS_REQUEST';
export const FETCH_REJECTED_EVENTS_SUCCESS = 'FETCH_REJECTED_EVENTS_SUCCESS';
export const FETCH_REJECTED_EVENTS_FAILURE = 'FETCH_REJECTED_EVENTS_FAILURE';

export const CLEAR_EVENTS = 'CLEAR_EVENTS';

export class RejectedListUpdate implements Action {
    public readonly type = REJECTED_LIST_UPDATE;
    constructor(public payload: any) {}
}

export class FetchRejectedEventsRequest implements Action {
    public readonly type = FETCH_REJECTED_EVENTS_REQUEST;
    constructor(public payload: any) {}
}

export class FetchRejectedEventsSuccess implements Action {
    public readonly type = FETCH_REJECTED_EVENTS_SUCCESS;
    constructor(public payload: any) {}
}

export class FetchRejectedEventsFailure implements Action {
    public readonly type = FETCH_REJECTED_EVENTS_FAILURE;
    constructor(public payload: any) {}
}

export class ClearEvents implements Action {
    public readonly type = CLEAR_EVENTS;
}

export type RejectedListActions =
    | RejectedListUpdate
    | FetchRejectedEventsRequest
    | FetchRejectedEventsSuccess
    | FetchRejectedEventsFailure
    | ClearEvents;
