import { Properties } from 'csstype';

// add types here when you modify state!
export type State = {
    theme: Properties
};

// add actions here when you modify state!
export type Action =
    | {
        type: 'CHANGE_THEME';
        payload: Properties; //css properties for inline styles
      }