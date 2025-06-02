import React, { createContext, useReducer, useEffect } from 'react';

const ActivityContext = createContext();

const initialState = {
  activities: JSON.parse(localStorage.getItem('activities')) || [],
  loading: false,
  error: null,
};

function activityReducer(state, action) {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.map(activity => 
          activity.id === action.payload.id ? action.payload : activity
        ),
      };
    case 'DELETE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.filter(activity => activity.id !== action.payload),
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

function ActivityProvider({ children }) {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  );
}

export { ActivityContext, ActivityProvider };
