import React, { createContext, useReducer, useEffect } from 'react';

const CategoryContext = createContext();

const initialState = {
  categories: JSON.parse(localStorage.getItem('categories')) || [],
  loading: false,
  error: null,
};

function categoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category => 
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
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

function CategoryProvider({ children }) {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(state.categories));
  }, [state.categories]);

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
}

export { CategoryContext, CategoryProvider };
