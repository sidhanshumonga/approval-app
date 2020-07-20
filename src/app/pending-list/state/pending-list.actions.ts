import { Action } from '@ngrx/store';

export const PENDING_LIST_UPDATE = 'PENDING_LIST_UPDATE';
export const FETCH_PENDING_EVENTS_REQUEST = 'FETCH_PENDING_EVENTS_REQUEST';
export const FETCH_PENDING_EVENTS_SUCCESS = 'FETCH_PENDING_EVENTS_SUCCESS';
export const FETCH_PENDING_EVENTS_FAILURE = 'FETCH_PENDING_EVENTS_FAILURE';
export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';

export const CLEAR_EVENTS = 'CLEAR_EVENTS'

export class PendingListUpdate implements Action {
    public readonly type = PENDING_LIST_UPDATE;
    constructor(public payload: any) { }
}

export class FetchEventsRequest implements Action {
    public readonly type = FETCH_PENDING_EVENTS_REQUEST;
    constructor(public payload: any) { }
}

export class FetchEventsSuccess implements Action {
    public readonly type = FETCH_PENDING_EVENTS_SUCCESS;
    constructor(public payload: any) { }
}

export class FetchEventsFailure implements Action {
    public readonly type = FETCH_PENDING_EVENTS_FAILURE;
    constructor(public payload: any) { }
}

export class UpdateEventRequest implements Action {
    public readonly type = UPDATE_EVENT_REQUEST;
    constructor(public payload: any) { }
}

export class UpdateEventSuccess implements Action {
    public readonly type = UPDATE_EVENT_SUCCESS;
}

export class ClearEvents implements Action {
    public readonly type = CLEAR_EVENTS;
}


export type PendingListActions =
    | PendingListUpdate
    | FetchEventsRequest
    | FetchEventsSuccess
    | FetchEventsFailure
    | UpdateEventRequest
    | UpdateEventSuccess
    | ClearEvents;
