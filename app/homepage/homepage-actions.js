import axios from "axios";
import { fromJS } from "immutable";

export const FETCH_BUILD_STATS = "FETCH_BUILD_STATS";
export const FETCH_FIREWALL_STATS = "FETCH_FIREWALL_STATS";
export const START_LOADING_DATA = "START_LOADING_DATA";


export const fetchBuild = (buildStats) => ({
  type: FETCH_BUILD_STATS,
  buildStats
});

export const fetchFirewallStats = (firewallStats) => ({
  type: FETCH_BUILD_STATS,
  firewallStats
});

export const startLoadingData = () => ({type: START_LOADING_DATA});

export const getImages = (section = "hot", sort = "viral", showViral = true) => async dispatch => {
  try {
    dispatch(startLoadingData());
    const response = await axios.get(`/api/v1/images/${section}/${sort}?showViral=${showViral}`);
    dispatch(fetchImages(fromJS(response.data)));
  } catch (error) {
    console.trace(error);
  }
};

