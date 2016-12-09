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
import LoadDataSpinner from "./load-data-spinner";
import {Icon} from "antd";


const toggleInfo = props => (index) => {
	props.setActiveKey(index);
};

const enhance = compose(
    setDisplayName("AnalyticsAccordion"),
    onlyUpdateForPropTypes,
    setPropTypes({
        analytics: IPropTypes.map,
        toggleInfo: PropTypes.func
    }),
    withState("activeKey", "setActiveKey"),
    withHandlers({toggleInfo})
);


const AnalyticsAccordion = enhance(({
    analytics = new Map(),
    toggleInfo,
    activeKey
}) => {
	const analyticsData = [...analytics.toJS()];
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
	}
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
				{analyticsData && analyticsData.map((value, index) =>
					<ul key={index} 
						className={`list-sub ${$buildColorSelect(value.status)}`} 
						onTouchTap={_ => toggleInfo(index)}>
						<li className="list-sub__first">
							{value.type === "firewall" ? <Icon type="link" /> : <Icon type="desktop" />}
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
						</li><li className="list-sub__first">
							<p>{value.status}</p>
						</li><li className="list-sub__first">
							<p>{value.status}</p>
						</li><li className="list-sub__first">
							<p>{value.status}</p>
						</li><li className="list-sub__first">
							<p>{value.status}</p>
						</li>
						{activeKey === index ? 
							<li>henmahjajhsjhasgjasjjas
							khashakshkashkahkskhashkas
							khaskhashksahkhkshkashashkaskh
							kjaskashkahkshas</li>

						: null}
					</ul>
				)}
			</div>
		</div>
	);
});

export default AnalyticsAccordion;
