import { Action } from '@ngrx/store';

export const APPROVED_LIST_UPDATE = 'APPROVED_LIST_UPDATE';

export const FETCH_APPROVED_EVENTS_REQUEST = 'FETCH_APPROVED_EVENTS_REQUEST';
export const FETCH_APPROVED_EVENTS_SUCCESS = 'FETCH_APPROVED_EVENTS_SUCCESS';
export const FETCH_APPROVED_EVENTS_FAILURE = 'FETCH_APPROVED_EVENTS_FAILURE';

export const CLEAR_EVENTS = 'CLEAR_EVENTS';

export class ApprovedListUpdate implements Action {
    public readonly type = APPROVED_LIST_UPDATE;
    constructor(public payload: any) {}
}

export class FetchApprovedEventsRequest implements Action {
    public readonly type = FETCH_APPROVED_EVENTS_REQUEST;
    constructor(public payload: any) {}
}

export class FetchApprovedEventsSuccess implements Action {
    public readonly type = FETCH_APPROVED_EVENTS_SUCCESS;
    constructor(public payload: any) {}
}

export class FetchApprovedEventsFailure implements Action {
    public readonly type = FETCH_APPROVED_EVENTS_FAILURE;
    constructor(public payload: any) {}
}

export class ClearEvents implements Action {
    public readonly type = CLEAR_EVENTS;
}

export type ApprovedListActions =
    | ApprovedListUpdate
    | FetchApprovedEventsRequest
    | FetchApprovedEventsSuccess
    | FetchApprovedEventsFailure
    | ClearEvents;