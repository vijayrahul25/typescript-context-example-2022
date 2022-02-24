
import {Actions} from "../actions/Actions";


type langauge = {
  name:string,
  description:string 
}
type translations = {
  en:langauge
}
export type category = {
  backgroundImage:string,
  translations:translations ,
  cid:number,
  totalPostCount:number,
  totalTopicCount:number
}

type teaser = {
  content:string
}
export type topic = {
  tid:number,
  title:string ,
  teaser:teaser,
  postcount:number,
}

export type TActionType = {
  type:Actions,
  data:any[],
}
export type TState = {
  categoryList: Array<category>
  topicList: Array<topic>
  loading:boolean,
  error:boolean,
}

export const Reducers = (state:TState, action:TActionType) => {
  switch (action.type) {
    case Actions.IN_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.LOAD_CATEGORIES_SUCESS: {      
      return {
        ...state,
        loading: false,
        error: false,
        categoryList: action.data,
      };
    } 
    case Actions.LOAD_TOPICS_SUCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        topicList: action.data,
      };
    }   
    case Actions.ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
};
