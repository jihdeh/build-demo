import React, { PropTypes } from "react";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import withState from "recompose/withState";
import withHandlers from "recompose/withHandlers";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import { Map } from "immutable";
import {Icon, Button, Select, Progress,  Modal} from "antd";
import ChartView from "./chart";

const Option = Select.Option;

const triggerModal = props => () => {
	props.setVisibility(!props.visible);
}

const enhance = compose(
    setDisplayName("MetricsBoard"),
    onlyUpdateForPropTypes,
    setPropTypes({
        metrics: IPropTypes.map,
        triggerModal: PropTypes.func,
        visible: PropTypes.bool
    }),
    withState("visible", "setVisibility", false),
    withHandlers({triggerModal})
);


const MetricsBoard = enhance(({
    metrics = new Map(),
    triggerModal,
    visible
}) => {
	const metricBorderColor = (overall) => {
		if(overall === -1) {
			return "metric-border__danger";
		} else if(overall > 59 && overall < 100) {
			return "metric-boder__running";
		} else if(overall === 100) {
			return "metric-border__success";
		} else {
			return "";
		}
	};

	const setStatusLayer = (status) => {
		switch(status) {
			case "Pending":
				return (
					<span>
						<h3>Result</h3>
						<p>No Stats</p>
					</span>
				);
				break;
			case "Running":
				return (
					<span>
						<h3>Result</h3>
						<p>In Progress </p>
						<Progress percent={50} status="active" />
						<Button>View Logs</Button>
					</span>
				);
				break;
			case "Complete":
				return (
					<span>
						<h3>Result</h3>
						<p>Build Complete</p>
						<Button>Deploy</Button>
						<p>to</p>
						<Select size="large" defaultValue="production" style={{ width: 200 }}>
					      <Option value="production">Production</Option>
					      <Option value="staging">Staging</Option>
					    </Select>
					</span>
				);
				break;
			case "Rejected":
				return (
					<span>
						<h3>Result</h3>
						<p>Change Rejected </p>
						<h1>Metrics Reduction</h1>
						<Button>Find Issues</Button>
					</span>
				);
				break;
			case "Accepted":
				return (
					<span>
						<h3>Result</h3>
						<p>Change Accepted </p>
						<h1>Auto-Merged</h1>
						<Button>
							<Icon type="search" /> 
							Merged Build
						</Button>
					</span>
				);
				break;
			default:
				return;
		}
	};

	return (
		<div>
			{metrics.map((value, index) => {
				return (
					<div>
					<Modal 
						title="Basic Modal" 
						visible={visible}
						onOk={triggerModal}
						onCancel={triggerModal}
						cancelText="Cancel"
						okText="Okay"
			        >
			          <p>Not adding anything in this modal as it is not required</p>
			          <p>some contents...</p>
			          <p>some contents...</p>
			        </Modal>
					<div 
						className={`block-analytics analytic__metrics ${metricBorderColor(value.metrics.overall)}`}
						onTouchTap={triggerModal}>
						<h4>Metrics</h4>
						<ul className="metric-list">
							<li>
								<Icon type="caret-up" />
								<p>{value.metrics.test}</p>
								<p>Test</p>

							</li>
							<li>
								<Icon type="caret-up" />
								<p>{value.metrics.maintainability}</p>
								<p>Maintainability</p>
							</li>
							<li>
								<Icon type="caret-right" />
								<p>{value.metrics.security}</p>
								<p>Security</p>
							</li>
							<li>
								<Icon type="caret-right" />
								<p>{value.metrics.workmanship}</p>
								<p>Workmanship</p>
							</li>
						</ul>
					</div>
					<div 
						className={`block-analytics analytic__build ${metricBorderColor(value.build.overall)}`}
						onTouchTap={triggerModal}>
						<h4>Build</h4>
						<ul className="metric-list build">
							<li>
								<Icon type="desktop" />
								<p>Debug</p>

							</li>
							<li>
								<Icon type="desktop" />
								<p>Release</p>

							</li>
						</ul>
						<p className="build__date">{value.build.date}</p>
					</div>
					<div 
						className={`block-analytics analytic__unit ${metricBorderColor(value.u_test.overall)}`}
						onTouchTap={triggerModal}>
						<h4>Unit Test</h4>
						<ChartView results={value.u_test.chart} />

					    <div className="analytics__unit-test_passed">
					    	<h1>{value.u_test.test_passed} %</h1>
					    	<p>test passed</p>
					    </div>
					    <div className="analytics__unit-code_coverage">
					    	<p>{value.u_test.coverage} %</p>
					    	<p>code covered</p>
					    </div>
					</div>
					<div 
						className={`block-analytics analytic__functional ${metricBorderColor(value.fn_test.overall)}`}
						onTouchTap={triggerModal}>
						<h4>Functional Test</h4>
						
						<ChartView results={value.fn_test.chart} />

					    <div className="analytics__functional-test_passed">
					    	<h1>{value.fn_test.test_passed} %</h1>
					    	<p>test passed</p>
					    </div>
					    <div className="analytics__functional-code_coverage">
					    	<p>{value.fn_test.coverage} %</p>
					    	<p>code covered</p>
					    </div>
					</div>
					<div className="block-analytics-feedback">
						{setStatusLayer(value.status)}
					</div>
					</div>
				)})
			}
		</div>
	)

});

export default MetricsBoard;