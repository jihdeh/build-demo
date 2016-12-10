import React, { PropTypes } from "react";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import { Map } from "immutable";
import {Icon} from "antd";
import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from "recharts";

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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
	const data01 = [{name: "Group A", value: 142}, {name: "Group B", value: 10}];
	const COLORS = ["#00C49F", "#FF8042"];
	return (
		<div>
			{metrics.map((value, index) => {
				return (
					<div>
					<div className={`block-analytics analytic__metrics ${metricBorderColor(value.metrics.overall)}`}>
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
					<div className={`block-analytics analytic__build ${metricBorderColor(value.build.overall)}`}>
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
					<div className={`block-analytics analytic__unit ${metricBorderColor(value.u_test.overall)}`}>
						<h4>Unit Test</h4>
						<ResponsiveContainer>
							<PieChart width={200} height={200}>
						        <Pie
						          data={value.u_test.chart} 
						          cx={55} 
						          cy={100} 
						          labelLine={false}
						          label={renderCustomizedLabel}
						          outerRadius={50} 
						          fill="#8884d8"
						        >
						        	{
						          	value.u_test.chart.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
						          }
						        </Pie>
						    </PieChart>
					    </ResponsiveContainer>
					    <div className="analytics__unit-test_passed">
					    	<h1>{value.u_test.test_passed} %</h1>
					    	<p>test passed</p>
					    </div>
					    <div className="analytics__unit-code_coverage">
					    	<p>{value.u_test.coverage} %</p>
					    	<p>code covered</p>
					    </div>
					</div>
					<div className={`block-analytics analytic__functional ${metricBorderColor(value.fn_test.overall)}`}>
						<h4>Functional Test</h4>
						<ResponsiveContainer>
							<PieChart width={200} height={200}>
						        <Pie
						          data={value.fn_test.chart} 
						          cx={55} 
						          cy={100} 
						          labelLine={false}
						          label={renderCustomizedLabel}
						          outerRadius={50} 
						          fill="#8884d8"
						        >
						        	{
						          	value.fn_test.chart.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
						          }
						        </Pie>
						    </PieChart>
					    </ResponsiveContainer>
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
						<h4>Functional Test</h4>
					</div>
					</div>
				)})
			}
		</div>
	)

});

export default MetricsBoard;