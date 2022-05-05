import {
    FC,
    Dispatch,
    Reducer,
    ReactElement,
    createContext,
    useContext,
    useReducer,
} from 'react';

import { State, Action } from '@/types/state';

const initialState: State = {
    theme: {
        color: '#000000',
    },
};

export const StateContext = createContext<[State, Dispatch<Action>]>([
    initialState,
    () => initialState,
]);

export const StateProvider: FC<StateProviderProps> = ({
    reducer,
    children,
}: StateProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};

// no thank you :D
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useStateValue = () => useContext(StateContext);

type StateProviderProps = {
    reducer: Reducer<State, Action>;
    children: ReactElement;
};
