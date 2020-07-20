import * as Actions from './date-filter.actions'


export interface DateState {
    startDate: string;
    endDate: string;
}

const initialState = {
    startDate: '',
    endDate: ''
}

export function reducer(state: DateState = initialState, action: Actions.DateActions): DateState {
    switch (action.type) {
        case Actions.START_DATE_UPDATE:
            return { ...state, startDate: action.payload };
        case Actions.END_DATE_UPDATE:
            return { ...state, endDate: action.payload };
        case Actions.CLEAR_DATES:
            return { startDate: '', endDate: '' };
        default:
            return state;
    }
}
