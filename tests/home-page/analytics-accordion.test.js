import React from "react";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {mount} from "enzyme";
import AnalyticsAccordion from "../../app/homepage/components/analytics-accordion";
import { Map, fromJS } from "immutable";


const mockStore = configureMockStore([ thunk ]);
const storeStateMock = new Map();

let store;
let component;
describe("tests for AnalyticsAccordionComponent", () => {
  beforeEach(() => {
    store = mockStore(storeStateMock);
    component = mount(<AnalyticsAccordion store={store}
    	analytics={fromJS({analytics: {data: [{overall: 100}, {overall: 60}]} })}/>);
  });

  it("renders top list of build options elememnt", () => {
    expect(component.find(".list-head")).toHaveLength(1);
    expect(component.find(".list-head li")).toHaveLength(8);
  });

 it("renders list metric elements", () => {
 	component.setProps(fromJS({analytics: {data: [{overall: 100}, {overall: 60}]} })); //TODO
  });

  it("asserts that div has correct structure", () => {
  	expect(component.html()).toEqual(
  		`<div><ul class=\"list-head\"><li>Changelist/Build</li><li>Owner</li><li>Time Started</li><li>State</li><li>Metrics</li><li>Build</li><li>Unit Test</li><li>Functional Test</li></ul><div></div></div>`
  		);
  });
  
});

