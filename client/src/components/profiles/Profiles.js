import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import {getProfiles} from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class Profiles extends PureComponent {

	componentDidMount() {
		this.props.getProfiles();
	}

	render() {
		console.log(this.props.profile.profiles);

		const {profiles, loading} = this.props.profile;
		let profileItems;

		if (loading || isEmpty(profiles)) {
			profileItems = <Spinner/>;
		}
		else if (!isEmpty(this.props.errors)) {
			profileItems = this.props.errors.response.data;
		}
		else {
			if (profiles.length > 0) {
				profileItems = profiles.map(profile => (
						<ProfileItem profile={profile} key={profile._id}/>
				))
			} else {
				profileItems = <h4>No profiles found.</h4>
			}
		}

		return (
				<main>
					<div className="container">
						<div className="profiles">
							<div className="container">
								<div className="row">
									<div className="col-md-12">
										<h1 className="display-4 text-center">Developer Profiles</h1>
										<p className="lead text-center">
											Browse and connect with developers
										</p>
										{profileItems}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
		);
	}
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, {getProfiles})(Profiles);