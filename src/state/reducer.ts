import { Properties } from 'csstype';
import { State, Action } from '@type/state';

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
    case 'CHANGE_THEME':
        return {
            ...state,
            theme: action.payload
        };
    default:
        return state;
    }
};

export const setTheme = (theme: Properties): Action => {
    return {
        type: 'CHANGE_THEME', 
        payload: theme
    };
};