import { Map } from "immutable";
import { set } from "../../util/functional-immutable";
import {
  FETCH_BUILD_STATS
} from "./homepage-actions";


const initialState = new Map();

const HomepageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUILD_STATS:
      return set("buildStats", action.buildStats, state);
    default:
      return state;
  }
}


export default HomepageReducer;
