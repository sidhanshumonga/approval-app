import * as Actions from './pending-list.actions';


export interface ListContent {
    nbbdId: string;
    motherName: string;
    birthDefect: string;
    status: string;
}

export interface PendingListState {
    list: ListContent[];
    loading: boolean;
}

const initialState = {
    list: [],
    loading: false
};

export function reducer(state: PendingListState = initialState, action: Actions.PendingListActions): PendingListState {
    switch (action.type) {
        case Actions.FETCH_PENDING_EVENTS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case Actions.FETCH_PENDING_EVENTS_SUCCESS:
            return {
                list: action.payload,
                loading: false
            };

        case Actions.FETCH_PENDING_EVENTS_FAILURE:
            return {
                ...state,
                loading: false
            };

        case Actions.CLEAR_EVENTS:
            return {
                list: [],
                loading: false
            };
        default:
            return state;
    }
}
