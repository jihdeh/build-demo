import React, { PropTypes } from "react";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import { Map, toJS } from "immutable";
import { connect } from "react-redux";
import withHandlers from "recompose/withHandlers";
import withState from "recompose/withState";
import { map, get } from "../../../util/functional-immutable";
import {Icon} from "antd";
import {
	getBuild
} from "../homepage-actions";
import MetricsBoard from "./metrics-board";


const mapStateToProps = state => ({
	analytics: state.get("analytics")
});

const mapDispatchToProps = (dispatch,props) => ({
	toggleInfo: (index, id) => {
		if(props.activeKey === index) return props.setActiveKey(null);
		props.setActiveKey(index);
		dispatch(getBuild(id));
	}
});

const enhance = compose(
    setDisplayName("AnalyticsAccordion"),
    onlyUpdateForPropTypes,
    setPropTypes({
        analytics: IPropTypes.map,
        toggleInfo: PropTypes.func
    }),
    withState("activeKey", "setActiveKey"),
    connect(mapStateToProps, mapDispatchToProps)
);


const AnalyticsAccordion = enhance(({
    analytics = new Map(),
    toggleInfo,
    activeKey
}) => {
	const analyticsData = Object.assign({}, analytics.toJS());
	const $buildColorSelect = (status) => {
		switch(status) {
			case "Pending":
				return "list-trow__disabled";
				break;
			case "Running":
				return "list-trow__running";
				break;
			case "Complete":
				return "list-trow__success";
				break;
			case "Rejected":
				return "list-trow__rejected";
				break;
			case "Accepted":
				return "list-trow__success";
				break;
			default:
				return;
		}
	};

	const metricBoxColor = (overall) => {
		if(overall === -1) {
			return "list-box__rejected";
		} else if(overall > 59 && overall < 100) {
			return "list-box__running";
		} else if(overall === 100) {
			return "list-box__completed";
		} else if(overall === 0){
			return "list-box__pending";
		} else {
			return;
		}
	};

	return (
		<div>
			<ul className="list-head">
				<li>Changelist/Build</li>
				<li>Owner</li>
				<li>Time Started</li>
				<li>State</li>
				<li>Metrics</li>
				<li>Build</li>
				<li>Unit Test</li>
				<li>Functional Test</li>
			</ul>
			<div>
				{analyticsData.data && analyticsData.data.map((value, index) =>
					<ul key={index} className={`list-sub ${$buildColorSelect(value.status)}`}>
						<span onTouchTap={_ => toggleInfo(index, value.id)}>
							<li className="list-sub__first">
								{value.type === "firewall" ? <Icon type="windows" /> : <Icon type="desktop" />}
								<p>{value.id}</p>
							</li>
							<li className="list-sub__first">
								<p>{value.owner}</p>
							</li>
							<li className="list-sub__first">
								<p>{value.time}</p>
							</li>
							<li className="list-sub__first">
								<p>{value.status}</p>
							</li>
							<li className="list-sub__first">
								<div className={`${metricBoxColor(value.metrics.overall)}`}></div>
							</li>
							<li className="list-sub__first">
								<div className={`${metricBoxColor(value.build.overall)}`}></div>
							</li>
							<li className="list-sub__first">
								<div className={`${metricBoxColor(value.u_test.overall)}`}></div>
							</li>
							<li className="list-sub__first">
								<div className={`${metricBoxColor(value.fn_test.overall)}`}></div>
							</li>
						</span>
						{activeKey === index ?
							<li>
								<MetricsBoard 
									metrics={analyticsData.buildStats}
								/>
							</li>

						: null}
					</ul>
				)}
			</div>
		</div>
	);
});

export default AnalyticsAccordion;
