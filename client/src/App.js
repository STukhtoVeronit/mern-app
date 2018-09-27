import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import history from './history';

import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser, checkJwtToken} from "./actions/authActions";
import {clearCurrentProfile} from "./actions/profileActions";

import './App.css';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute'

import Navbar from './components/layout/Navbar';
import Landing from "./components/layout/Landing";
import Footer from './components/layout/Footer';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

//TODO: store logic into saga
if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));
	const currentTime = Date.now() / 1000;

	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		store.dispatch(clearCurrentProfile());
		window.location.href = '/login';
	}
}

class App extends Component {
	componentWillMount() {
		this.props.checkJwtToken();
	}

	render() {
		return (
				<div className="App">
					<Navbar/>
					<Switch>

						<Route exact path="/" component={Landing}/>
						<main>
							<div className="container">
								<Switch>
									<Route exact path="/register" component={Register}/>
									<Route exact path="/login" component={Login}/>
									<Route exact path="/profiles" component={Profiles}/>
									<Route exact path="/profile/:handle" component={Profile}/>
									<Route exact path="/not-found" component={NotFound}/>


									<PrivateRoute
											exact path="/dashboard"
											component={Dashboard}/>

									<PrivateRoute
											exact path="/create-profile"
											component={CreateProfile}/>

									<PrivateRoute
											exact path="/edit-profile"
											component={EditProfile}/>

									<PrivateRoute
											exact path="/add-experience"
											component={AddExperience}/>

									<PrivateRoute
											exact path="/add-education"
											component={AddEducation}/>

									<PrivateRoute
											exact path="/feed"
											component={Posts}/>

									<PrivateRoute
											exact path="/post/:id"
											component={Post}/>

									<Route component={NotFound}/>

								</Switch>


							</div>

						</main>

					</Switch>

					<Footer/>

				</div>

		);
	}
}

App.propTypes = {
	checkJwtToken: PropTypes.func.isRequired,
	errors: PropTypes.object,
};

const mapStateToProps = state => ({
	errors: state.errors
});

export default withRouter(connect(mapStateToProps, {checkJwtToken})(App));
