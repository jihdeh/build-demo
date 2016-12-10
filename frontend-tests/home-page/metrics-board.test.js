import React from "react";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {shallow, mount, render} from "enzyme";
import MetricsBoard from "../../app/homepage/components/metrics-board";
import { Map, fromJS } from "immutable";


const mockStore = configureMockStore([ thunk ]);
const storeStateMock = new Map();

let store;
let component;
describe("tests for MetricsBoardComponent", () => {
  beforeEach(() => {
    store = mockStore(storeStateMock);
    component = mount(<MetricsBoard store={store}
    	metrics={[{"id":"432461","type":"firewall","owner":"samy","status":"Rejected","time":"4/18/2014 10:53am","metrics":{"overall":-1,"test":74,"maintainability":30,"security":60,"workmanship":63},"build":{"overall":100,"date":"11:00am 4/18/2014"},"u_test":{"overall":100,"coverage":55,"test_passed":81,"chart":[{"name":"a","value":142},{"name":"b","value":143}]},"fn_test":{"overall":100,"coverage":68,"test_passed":73,"chart":[{"name":"a","value":431},{"name":"b","value":245}]}}]}/>);
  });

  it("renders 4 block elements", () => {
    expect(component.find(".block-analytics")).toHaveLength(4);
  });

  it("asserts that div has correct structure", () => {
  	expect(component.html()).toEqual(
  		`<div><div><!-- react-empty: 3 --><div class=\"block-analytics analytic__metrics metric-border__danger\"><h4>Metrics</h4><ul class=\"metric-list\"><li><i class=\"anticon anticon-caret-up\"></i><p>74</p><p>Test</p></li><li><i class=\"anticon anticon-caret-up\"></i><p>30</p><p>Maintainability</p></li><li><i class=\"anticon anticon-caret-right\"></i><p>60</p><p>Security</p></li><li><i class=\"anticon anticon-caret-right\"></i><p>63</p><p>Workmanship</p></li></ul></div><div class=\"block-analytics analytic__build metric-border__success\"><h4>Build</h4><ul class=\"metric-list build\"><li><i class=\"anticon anticon-desktop\"></i><p>Debug</p></li><li><i class=\"anticon anticon-desktop\"></i><p>Release</p></li></ul><p class=\"build__date\">11:00am 4/18/2014</p></div><div class=\"block-analytics analytic__unit metric-border__success\"><h4>Unit Test</h4><div class=\"recharts-responsive-container\" style=\"width: 100%; height: 100%;\"><!-- react-empty: 76 --><div style=\"position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: scroll; z-index: -1; visibility: hidden;\"><div style=\"position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: scroll; z-index: -1; visibility: hidden;\"><div style=\"position: absolute; left: 0px; top: 0px; width: 0px; height: 0px;\"></div></div><div style=\"position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: scroll; z-index: -1; visibility: hidden;\"><div style=\"position: absolute; left: 0px; top: 0px; width: 200%; height: 200%;\"></div></div></div></div><div class=\"analytics__unit-test_passed\"><h1><!-- react-text: 43 -->81<!-- /react-text --><!-- react-text: 44 --> %<!-- /react-text --></h1><p>test passed</p></div><div class=\"analytics__unit-code_coverage\"><p><!-- react-text: 48 -->55<!-- /react-text --><!-- react-text: 49 --> %<!-- /react-text --></p><p>code covered</p></div></div><div class=\"block-analytics analytic__functional metric-border__success\"><h4>Functional Test</h4><div class=\"recharts-responsive-container\" style=\"width: 100%; height: 100%;\"><!-- react-empty: 77 --><div style=\"position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: scroll; z-index: -1; visibility: hidden;\"><div style=\"position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: scroll; z-index: -1; visibility: hidden;\"><div style=\"position: absolute; left: 0px; top: 0px; width: 0px; height: 0px;\"></div></div><div style=\"position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: scroll; z-index: -1; visibility: hidden;\"><div style=\"position: absolute; left: 0px; top: 0px; width: 200%; height: 200%;\"></div></div></div></div><div class=\"analytics__functional-test_passed\"><h1><!-- react-text: 61 -->73<!-- /react-text --><!-- react-text: 62 --> %<!-- /react-text --></h1><p>test passed</p></div><div class=\"analytics__functional-code_coverage\"><p><!-- react-text: 66 -->68<!-- /react-text --><!-- react-text: 67 --> %<!-- /react-text --></p><p>code covered</p></div></div><div class=\"block-analytics-feedback\"><span><h3>Result</h3><p>Change Rejected </p><h1>Metrics Reduction</h1><button type=\"button\" class=\"ant-btn\"><span>Find Issues</span></button></span></div></div></div>`
  		);
  })
});