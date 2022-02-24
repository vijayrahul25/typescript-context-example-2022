import React from "react";
import axios from "axios";

import { Actions } from "./actions/Actions";
import { Reducers, TState } from "./reducer/Reducers";

export type TValueContext = {
  state: TState;
  loadCategories: () => any;
  loadTopics: (categoryId: number) => any;
  loadPosts: (id: number) => any;
};

const initialState: TState = {
  categoryList: [],
  topicList: [],
  postList: [],
  loading: false,
  error: false,
};

const initialContext = {
  state: initialState,
  loadCategories: () => {},
  loadTopics: (categoryId: number) => {},
  loadPosts: (id: number) => {},
};

export const GlobalContext = React.createContext<TValueContext>(initialContext);

export const GlobalContextProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(Reducers, initialState);

  let loadCategories = () => {
    dispatch({ type: Actions.IN_PROGRESS, data: [] });
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

  const loadTopics = (categoryId: number) => {
    dispatch({ type: Actions.IN_PROGRESS, data: [] });
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/category/${categoryId}`)
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
  const loadPosts = (id: number) => {
    dispatch({ type: Actions.IN_PROGRESS, data: [] });
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/topic/${id}`)
      .then((resp) => {
        dispatch({
          type: Actions.LOAD_POSTS_SUCESS,
          data: resp.data.posts,
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
    loadTopics,
    loadPosts,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
