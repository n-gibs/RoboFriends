import {CHANGE_SEARCH_FIELD} from './constants.js';

const intialState = {
  searchField: ''
}

//reducer
//get input, if action is related to search robots, we will act on the state
export const searchRobots = (state=intialState, action={})=>{
  switch(action.type){
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, state, {searchField: action.payload});
    default:
      return state;
  }
}