import { createContext, useReducer, useCallback } from "react";

// Create the WorkoutsContext
export const WorkoutsContext = createContext();

// Initial state structure
const initialState = {
    workouts: [],  // Default empty array for workouts
    loading: false, // Loading state (optional)
    error: null,    // Error state (optional)
};

// WorkoutsReducer to handle the actions
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                ...state,
                workouts: action.payload || [], // Ensure it's an empty array if payload is undefined
            }

        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts], // Adds new workout to the front
            }

        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id), // Deletes workout by _id
            }

        case 'UPDATE_WORKOUT':
            return {
                ...state,
                workouts: state.workouts.map((w) =>
                    w._id === action.payload._id ? action.payload : w // Update specific workout
                ),
            }

        case 'SET_LOADING':
            return {
                ...state,
                loading: true, // Set loading state
            }

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload, // Set error state
            }

        default:
            return state;
    }
}

// WorkoutsContextProvider to wrap around components
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, initialState);

    const memoizedDispatch = useCallback(dispatch, []); // Memoize dispatch

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch: memoizedDispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}
