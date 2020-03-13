import { ActionReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';


import * as fromDates from './date-filter/state/date-filter.reducer';
import * as fromRejectedList from './rejected-list/state/rejected-list.reducer';
import * as fromApprovedList from './approved-list/state/approved-list.reducer';
import * as fromPendingList from './pending-list/state/pending-list.reducer';

export interface State {
    dates: fromDates.DateState;
    pendingList: fromPendingList.PendingListState;
    approvedList: fromApprovedList.ApprovedListState;
    rejectedList: fromRejectedList.RejectedListState;
}

export const dates = (state: State) => state.dates;
export const pendingList = (state: State) => state.pendingList;
export const approvedList = (state: State) => state.approvedList;
export const rejectedList = (state: State) => state.rejectedList;

export const appReducers = {
    dates: fromDates.reducer,
    pendingList: fromPendingList.reducer,
    approvedList: fromApprovedList.reducer,
    rejectedList: fromRejectedList.reducer
};

export function loggerReducer(reducer: ActionReducer<State>): any {
    // default, no options
    return storeLogger()(reducer);
}
