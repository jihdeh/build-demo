import axios from "axios";
import { fromJS } from "immutable";

export const FETCH_BUILD_STATS = "FETCH_BUILD_STATS";


export const fetchBuild = (buildStats) => ({
  type: FETCH_BUILD_STATS,
  buildStats
});

export const getBuild = (id) => async dispatch => {
  try {
    const response = await axios.get(`/api/v1/stats/${id}`);
    dispatch(fetchBuild(fromJS(response.data)));
  } catch (error) {
    console.trace(error);
  }
};