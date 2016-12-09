import React, { PropTypes } from "react";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import { Map } from "immutable";
import {Icon} from "antd";


const enhance = compose(
    setDisplayName("MetricsBoard"),
    onlyUpdateForPropTypes,
    setPropTypes({
        metrics: IPropTypes.map
    })
);


const MetricsBoard = enhance(({
    metrics = new Map(),
}) => {
	const metricBorderColor = (overall) => {
		if(overall === -1) {
			return "metric-border__danger";
		} else if(overall > 59 && overall < 100) {
			return "metrics-boder__pending";
		} else if(overall === 100) {
			return "metric-border__success";
		} else {
			return "";
		}
	}
	console.log(metrics)
	return (
		<div>
			{metrics.map((value, index) => {
				return (
					<div>
					<div className={`block-analytics ${metricBorderColor(value.metrics.overall)}`}>
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
					<div className={`block-analytics ${metricBorderColor(value.build.overall)}`}>
						<h4>Build</h4>
						<ul className="metric-list">
							<li>
								<Icon type="desktop" />
								<p>Debug</p>

							</li>
							<li>
								<Icon type="desktop" />
								<p>Release</p>

							</li>
						</ul>
						<p>{value.build.date}</p>
					</div>
					<div className={`block-analytics ${metricBorderColor(value.u_test.overall)}`}>
						<h4>Unit Test</h4>
					</div>
					<div className={`block-analytics ${metricBorderColor(value.fn_test.overall)}`}>
						<h4>Functional Test</h4>
					</div>
					<div className="block-analytics-feedback">
						<h4>Functional Test</h4>
					</div>
					</div>
				)})
			}
		</div>
	)

});

export default MetricsBoard;