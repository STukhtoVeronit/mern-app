import React, { Component} from 'react';
import history from "../../history";

class ButtonBack extends Component {
	constructor() {
		super();
		ButtonBack.onGoBackButtonClick = ButtonBack.onGoBackButtonClick.bind(this);
	}

	static onGoBackButtonClick(e) {
		history.goBack();
	}

	render() {
		return (
				<div className="col-md-3">
					<a onClick={ButtonBack.onGoBackButtonClick} className="btn btn-light mb-3">
						Go back
					</a>
				</div>
		);
	}
}

export default ButtonBack;