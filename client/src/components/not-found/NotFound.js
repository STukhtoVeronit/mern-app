import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import ButtonBack from "../common/ButtonBack";

class NotFound extends PureComponent {

	render() {

		return (
				<main>
					<div className="container">
						<ButtonBack/>

						<div>
							<h3 className="display-4">Page not found</h3>
							<div className="text-secondary">
							{
								Object.keys(this.props.errors).length ?
									this.props.errors.response.data
									: null
							}
							</div>
						</div>
					</div>
				</main>
		);
	}
}

NotFound.propTypes = {
	errors: PropTypes.object,
};

const matStateToProps = state => ({
	errors: state.errors
});

export default connect(matStateToProps,{})(NotFound);