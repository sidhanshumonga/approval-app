import * as Actions from './rejected-list.actions';


export interface ListContent {
    nbbdId: string;
    motherName: string;
    BirthDefect: string;
    Status: string;
}

export interface RejectedListState {
    list: ListContent[];
}

const initialState = {
    list: []
}

export function reducer(state: RejectedListState = initialState, action: Actions.RejectedListActions): RejectedListState {
    switch (action.type) {
        case Actions.FETCH_REJECTED_EVENTS_SUCCESS:
            return {
                list: action.payload
            };

        default:
            return state
    }
}
