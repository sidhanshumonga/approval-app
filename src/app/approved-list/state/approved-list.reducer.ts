import * as Actions from './approved-list.actions';


export interface ListContent {
    nbbdId: string;
    motherName: string;
    BirthDefect: string;
    Status: string;
}

export interface ApprovedListState {
    list: ListContent[];
    loading: boolean;
}

const initialState = {
    list: [],
    loading: false
};

export function reducer(state: ApprovedListState = initialState, action: Actions.ApprovedListActions): ApprovedListState {
    switch (action.type) {
        case Actions.FETCH_APPROVED_EVENTS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case Actions.FETCH_APPROVED_EVENTS_SUCCESS:
            return {
                list: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
