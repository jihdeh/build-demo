import React, { PropTypes } from "react";
import compose from "recompose/compose";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
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
    setDisplayName("ChartView"),
    onlyUpdateForPropTypes,
    setPropTypes({
        results: PropTypes.array.isRequired
    })
);

const pieColors = ["#00C49F", "#FF8042"];

const ChartView = enhance(({
    results = [],
}) => (
	<ResponsiveContainer>
		<PieChart width={200} height={200}>
	        <Pie
	          data={results} 
	          cx={55} 
	          cy={90} 
	          labelLine={false}
	          label={renderCustomizedLabel}
	          outerRadius={50} 
	          fill="#8884d8">
		        {
		        	results.map((entry, index) => <Cell key={index} fill={pieColors[index % pieColors.length]}/>)
		        }
	        </Pie>
	    </PieChart>
    </ResponsiveContainer>

));


export default ChartView;
