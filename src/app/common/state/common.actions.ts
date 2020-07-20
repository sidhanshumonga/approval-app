import { Action } from '@ngrx/store';

export const FETCH_ROOT_ORGUNIT_REQUEST = 'FETCH_ROOT_ORGUNIT_REQUEST';
export const FETCH_ROOT_ORGUNIT_SUCCESS = 'FETCH_ROOT_ORGUNIT_SUCCESS';
export const FETCH_ROOT_ORGUNIT_FAILURE = 'FETCH_ROOT_ORGUNIT_FAILURE';

export class FetchRootOrgunitRequest implements Action {
    public readonly type = FETCH_ROOT_ORGUNIT_REQUEST;
}

export class FetchRootOrgunitSuccess implements Action {
    public readonly type = FETCH_ROOT_ORGUNIT_SUCCESS;
    constructor(public payload: any) { }
}

export class FetchRootOrgunitFailure implements Action {
    public readonly type = FETCH_ROOT_ORGUNIT_FAILURE;
    constructor(public payload: any) { }
}


export type CommonActions =
    | FetchRootOrgunitRequest
    | FetchRootOrgunitSuccess
    | FetchRootOrgunitFailure;
