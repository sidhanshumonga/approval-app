import { Action } from '@ngrx/store';

export const PENDING_LIST_UPDATE = 'PENDING_LIST_UPDATE';
export const FETCH_PENDING_EVENTS_REQUEST = 'FETCH_PENDING_EVENTS_REQUEST';
export const FETCH_PENDING_EVENTS_SUCCESS = 'FETCH_PENDING_EVENTS_SUCCESS';
export const FETCH_PENDING_EVENTS_FAILURE = 'FETCH_PENDING_EVENTS_FAILURE';

export class PendingListUpdate implements Action {
    public readonly type = PENDING_LIST_UPDATE;
    constructor(public payload: any) {}
}

export class FetchEventsRequest implements Action {
    public readonly type = FETCH_PENDING_EVENTS_REQUEST;
    constructor(public payload: any) {}
}

export class FetchEventsSuccess implements Action {
    public readonly type = FETCH_PENDING_EVENTS_SUCCESS;
    constructor(public payload: any) {}
}

export class FetchEventsFailure implements Action {
    public readonly type = FETCH_PENDING_EVENTS_FAILURE;
    constructor(public payload: any) {}
}


export type PendingListActions =
    | PendingListUpdate
    | FetchEventsRequest
    | FetchEventsSuccess
    | FetchEventsFailure;
