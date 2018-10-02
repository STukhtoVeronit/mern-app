import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from "../../actions/profileActions";
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Education from './Education';
import Experience from './Experience';

class Dashboard extends PureComponent {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	onDeleteClick(e) {
		this.props.deleteAccount();
	}

	render() {
		const {user} = this.props.auth;
		const {profile, loading} = this.props.profile;

		let dashboardContent;

		if (profile === null || loading) {
			dashboardContent = <Spinner/>;
		} else {
			//check if logged user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
						<div>
							<p className="lead text-muted">Welcome <Link to={`/profile/${profile.user._id}`}> {user.name} </Link></p>

							<ProfileActions/>
							<Experience experience={profile.experience}/>
							<Education education={profile.education}/>

							<div style={{marginBottom: '60px'}}></div>
							<button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete
								account {user.name}</button>
						</div>
				);
			} else {
				//USer is logged in but have no profile
				dashboardContent = (
						<div>
							<p className="lead text-muted">Welcome {user.name}</p>
							<p>Yoy have not setup profile</p>
							<Link to="/create-profile" className="btn btn-lg btn-info">
								Create Profile
							</Link>
						</div>
				)
			}
		}
		return (
				<main>
					<div className="container">
						<div className="dashboard">
							<div className="container">
								<div className="row">
									<div className="col-md-12">
										<h1 className="display-4">Dashboard</h1>
										{dashboardContent}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
		);
	}
}

Dashboard.protoTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);