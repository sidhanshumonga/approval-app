import * as Actions from './rejected-list.actions';


export interface ListContent {
    nbbdId: string;
    motherName: string;
    BirthDefect: string;
    Status: string;
}

export interface RejectedListState {
    list: ListContent[];
    loading: boolean;
}

const initialState = {
    list: [],
    loading: false
}

export function reducer(state: RejectedListState = initialState, action: Actions.RejectedListActions): RejectedListState {
    switch (action.type) {
        case Actions.FETCH_REJECTED_EVENTS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case Actions.FETCH_REJECTED_EVENTS_SUCCESS:
            return {
                list: action.payload,
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
