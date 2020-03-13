import * as Actions from './pending-list.actions';


export interface ListContent {
    nbbdId: string;
    motherName: string;
    birthDefect: string;
    status: string;
}

export interface PendingListState {
    list: ListContent[];
}

const initialState = {
    list: []
}

export function reducer(state: PendingListState = initialState, action: Actions.PendingListActions): PendingListState {
    switch (action.type) {
        case Actions.FETCH_PENDING_EVENTS_SUCCESS:
            return {
                list: action.payload
            };
        default:
            return state;
    }
}
