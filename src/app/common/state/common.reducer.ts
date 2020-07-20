import * as Actions from './common.actions';

export interface CommonState {
    orgUnit: object;
}

const initialState = {
    orgUnit: {}
};

export function reducer(state: CommonState = initialState, action: Actions.CommonActions): CommonState {
    switch (action.type) {
        case Actions.FETCH_ROOT_ORGUNIT_SUCCESS:
            return {
                orgUnit: action.payload
            };
        default:
            return state;
    }
}
