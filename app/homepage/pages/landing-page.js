import React, {Component} from "react";
import frontPage from "../../decorators/frontpage";
import AnalyticsAccordion from "../components/analytics-accordion";
import { connect } from "react-redux";

const mapStateToProps = state => ({
	analytics: state.get("analytics")
});

@frontPage()
class HomeView extends Component {
	constructor(props) {
		super(props);
	};
	render() {
		const {
			analytics
		} = this.props;
		return (
			<div className="container">
				<AnalyticsAccordion analytics={analytics}/>
			</div>
		)
	}
}


export default connect(mapStateToProps)(HomeView);
