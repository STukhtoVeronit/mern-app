import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import history from "../../history";
// import InputFile from "../common/InputFile";

class Register extends PureComponent {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			avatarImg: {},
			avatarImgId: null,
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
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onInputFileSelected = (e) => {
		let img = e.target.files[0];
		let fd = new FormData();
		fd.append('image', img, img.name);
		this.setState({
			avatarImg: fd
		});

	};

	onSubmit(e) {
		e.preventDefault();

		// this.props.uploadImage();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
			// avatarImg: this.state.avatarImg
		};

		// console.log(newUser);
		this.props.registerUser(newUser);

	}

	render() {
		const {errors} = this.state;
		return (
			<main>
				<div className="container">
					<div className="register">
						<div className="container">
							<div className="row">
								<div className="col-md-8 m-auto">
									<h1 className="display-4 text-center">Sign Up</h1>
									<p className="lead text-center">Create your DevConnector account</p>
									<form onSubmit={this.onSubmit}>
										<TextFieldGroup
											onChange={this.onChange}
											value={this.state.name}
											name="name"
											placeholder="Name"
											error={errors.name}/>

										<TextFieldGroup
											type="email"
											onChange={this.onChange}
											value={this.state.email}
											name="email"
											placeholder="email"
											error={errors.email}
											info="This site uses Gravatar by default."
										/>

										{/*<InputFile*/}
											{/*type="file"*/}
											{/*onChange={this.onInputFileSelected}*/}
											{/*name="avatarImg"*/}
											{/*error={errors.avatar}*/}
										{/*/>*/}

										<TextFieldGroup
											type="password"
											onChange={this.onChange}
											value={this.state.password}
											name="password"
											placeholder="password"
											error={errors.password}/>

										<TextFieldGroup
											type="password"
											onChange={this.onChange}
											value={this.state.password2}
											name="password2"
											placeholder="Confirm Password"
											error={errors.password2}/>

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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));