import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProfileByUserId} from "../../actions/profileActions";
import history from "../../history";

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import ButtonBack from "../common/ButtonBack";

class Profile extends PureComponent {

	componentDidMount() {
		if (this.props.match.params.user_id) {
			this.props.getProfileByHandle(this.props.match.params.user_id);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.profile.profile === null && this.props.profile.loading) {
			history.push('/not-found');
		}
	}

	render() {
		const {profile, loading} = this.props.profile;
		let profileContent;
		if (profile === null || loading) {
			profileContent = <Spinner/>
		} else {
			profileContent = (
					<div>
						<div className="row">
							<ButtonBack/>
						</div>
						<div className="col-md-6">
						</div>
						<ProfileHeader profile={profile}/>
						<ProfileAbout profile={profile}/>
						<ProfileCreds profile={profile}/>
						{profile.githubusername ? <ProfileGithub username={profile.githubusername}/> : null}
					</div>
			)
		}
		return (
				<main>
					<div className="container">
						<div className="profile">
							<div className="container">
								<div className="row">
									<div className="col-md-12">
										{profileContent}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
		);
	}
}

Profile.propType = {
	profile: PropTypes.object.isRequired,
	getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle: getProfileByUserId})(Profile);