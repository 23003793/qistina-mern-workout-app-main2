import { createContext, useReducer } from "react";

// Create the WorkoutsContext
export const WorkoutsContext = createContext();

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
            // Ensure action.payload._id exists
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id),
            }

        case 'UPDATE_WORKOUT':
            return {
                ...state,
                workouts: state.workouts.map((w) =>
                    w._id === action.payload._id ? action.payload : w // Update specific workout
                ),
            }

        default:
            return state;
    }
}

// WorkoutsContextProvider to wrap around components
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: [], // Default to empty array
    })

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}
