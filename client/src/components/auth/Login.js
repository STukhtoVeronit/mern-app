import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from "../../actions/authActions";
import TextFieldGroup from '../common/TextFieldGroup';
import history from '../../history';


class Login extends PureComponent {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			history.push('/dashboard');
		}
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
		if (nextProps.auth.user.email) {
			//TODO: if user have just register insert its email
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(userData);
	}

	render() {
		const {errors} = this.state;
		return (
				<main>
					<div className="container">
						<div className="login">
							<div className="container">
								<div className="row">
									<div className="col-md-8 m-auto">
										<h1 className="display-4 text-center">Log In</h1>
										<p className="lead text-center">Sign in to your DevConnector account</p>
										<form onSubmit={this.onSubmit}>

											<TextFieldGroup type="email" onChange={this.onChange} value={this.state.email} name="email"
																			placeholder="Email Address" error={errors.email}/>

											<TextFieldGroup type="password" onChange={this.onChange} value={this.state.password}
																			name="password" placeholder="password" error={errors.password}/>

											<input type="submit" className="btn btn-info btn-block mt-4"/>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>

		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);