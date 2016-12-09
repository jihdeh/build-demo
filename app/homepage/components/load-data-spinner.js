import React, { PropTypes } from "react";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import { Spin } from "antd";

const enhance = compose(
	setDisplayName("LoadDataSpinner"),
	onlyUpdateForPropTypes,
	setPropTypes({
		loading: PropTypes.bool
	}),
);

const LoadDataSpiner = enhance(({
	loading,
}) => (
		<div className="load-data-spinner">
			{ loading &&
				<div className="overlay">
	          		<Spin size="large" />
				</div>
			}
		</div>
	)
);

export default LoadDataSpiner;
