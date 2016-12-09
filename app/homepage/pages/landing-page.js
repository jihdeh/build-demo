import React, {Component} from "react";
import frontPage from "../../decorators/frontpage";
import AnalyticsAccordion from "../components/analytics-accordion";

@frontPage()
class HomeView extends Component {

	render() {
		return (
			<div className="container">
				<AnalyticsAccordion />
			</div>
		)
	}
}


export default HomeView;
