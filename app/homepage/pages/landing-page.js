import React, {PropTypes, Component} from "react";
import IPropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import frontPage from "../../decorators/frontpage";
import AnalyticsAccordion from "../components/analytics-accordion";


const mapStateToProps = (state, props) => ({
	analytics: state.get("analytics"),
});

@frontPage()
class HomeView extends Component {
	static propTypes = {
		analytics: IPropTypes.map
	}
	render() {
		const { analytics } = this.props;
		return (
			<div className="container">
				<AnalyticsAccordion analytics={analytics} />
			</div>
		)
	}
}


export default connect(mapStateToProps)(HomeView);
