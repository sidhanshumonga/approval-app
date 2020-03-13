import * as Actions from './approved-list.actions';


export interface ListContent {
    nbbdId: string;
    motherName: string;
    BirthDefect: string;
    Status: string;
}

export interface ApprovedListState {
    list: ListContent[];
}

const initialState = {
    list: []
}

export function reducer(state: ApprovedListState = initialState, action: Actions.ApprovedListActions): ApprovedListState {
    switch (action.type) {
        case Actions.FETCH_APPROVED_EVENTS_SUCCESS:
            return {
                list: action.payload
            };
        default:
            return state;
    }
}
