import React from "react";
import axios from "axios";

import {Actions} from "./actions/Actions";
import { Reducers,TState } from "./reducer/Reducers";

export type TValueContext = {
    state:TState,  
    loadCategories: () => any,
    loadTopics: (id:number) => any, 
}

const initialState:TState = {
  categoryList: [],
  topicList:[],
  loading: false,
  error: false,
};

const initialContext = {
  state:initialState,  
  loadCategories: () => {}, 
  loadTopics: (id:number) => {}, 
}

export const GlobalContext = React.createContext<TValueContext>(initialContext);

export const GlobalContextProvider = ({ children }:any) => {
  const [state, dispatch] = React.useReducer(Reducers, initialState);

  let loadCategories = () => {
    console.log('loading category')
    dispatch({ type: Actions.IN_PROGRESS,data: [] });
     axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/category/${process.env.REACT_APP_PARENT_CATEGORY_ID}`
      )
      .then((resp) => {
        dispatch({
          type: Actions.LOAD_CATEGORIES_SUCESS,
          data: resp.data.children,
        });
      })
      .catch((e) =>
        dispatch({
          type: Actions.ERROR,
          data: e.message,
        })
      );
  };

  const loadTopics = (id:number) => {
    dispatch({ type: Actions.IN_PROGRESS,data: [] });
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/category/${id}`)
      .then((resp) => {
        dispatch({
          type: Actions.LOAD_TOPICS_SUCESS,
          data: resp.data.topics,
        });
      })
      .catch((e) =>
        dispatch({
          type: Actions.ERROR,
          data: e.message,
        })
      );
  };

  const value = {
    state,
    loadCategories,  
    loadTopics 
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
