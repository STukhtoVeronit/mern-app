import React from 'react';
import {getWikiTerm} from "../../actions/wikiActions";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


class WikiHOC extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			term: props.search ? props.search : '',
		};
		this.onTermClick = this.onTermClick.bind(this);
	}

	onTermClick() {
		this.props.getWikiTerm(this.state.term);
	}

	render() {
		return (
				<div className="wiki_block" onClick={this.onTermClick}>
					{this.props.children}
				</div>
		);
	}
}

WikiHOC.propTypes = {
	getWikiTerm: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	wiki: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	wiki: state.wiki,
	errors: state.errors
});

export default connect(mapStateToProps, {getWikiTerm})(WikiHOC);