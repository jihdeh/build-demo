import { Map } from "immutable";
import {pipe} from "ramda";
import { set } from "../../util/functional-immutable";
import {
  FETCH_BUILD_STATS,
  START_LOADING_DATA
} from "./homepage-actions";


const initialState = new Map();

const HomepageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUILD_STATS:
      return pipe(
        set("buildStats", action.buildStats),
        set("loading", false)
        )(state);
    case START_LOADING_DATA:
      return set("loading", true, state);
    default:
      return state;
  }
}


export default HomepageReducer;
