import React, { createContext, useReducer } from 'react';

export const Context = createContext();

export const initialState = {
  data: {},
};

export const Store = (props) => {
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_DATA':
        return {
          data: action.payload,
        };
      default:
        return null;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
