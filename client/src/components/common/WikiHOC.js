import React from 'react';
import {getWikiTerm} from "../../actions/wikiActions";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Modal from "./modals/TermModal";
import Spinner from "./Spinner";

class WikiHOC extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			term: props.search ? props.search : '',
			showModal: false,
			modal: null,
			domParser: new DOMParser()

		};
		this.onTermClick = this.onTermClick.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleHide = this.handleHide.bind(this);
	}

	handleShow() {
		this.setState({showModal: true});
	}

	handleHide() {
		this.setState({showModal: false});
	}

	onTermClick() {
		if (!this.state.showModal) {
			this.props.getWikiTerm(this.state.term);
			this.setState({showModal: true});
		} else {
			this.setState({showModal: false});
			this.setState({modal: null});
		}
	}

	componentWillReceiveProps(nextProps, nextState) {
		const {wiki, loading} = nextProps.wiki;

		if (loading && this.state.showModal) {
			this.setState({
				modal: (
						<Modal>
							<div className="modal">
								<div className="container bg-white p-3">
									<Spinner/>
								</div>
							</div>
						</Modal>
				)
			})
		}
		else if (Object.keys(nextProps.errors).length && this.state.showModal) {
			this.setState({
				modal: (
						<Modal>
							<div className="modal">
								<div className="container bg-white p-3">
									{nextProps.errors.response.data}
								</div>
							</div>
						</Modal>
				)
			})
		}
		else if (Object.keys(wiki).length && this.state.showModal) {
			this.setState({
				modal: (
						<Modal>
							<div className="modal">
								<div className="container bg-white p-3"
										 dangerouslySetInnerHTML={
										 	{__html: wiki.snippet+` <a target="_blank" href='https://en.wikipedia.org/?curid=${wiki.pageid}'>read more</a>`}
										 }>
								</div>
							</div>
						</Modal>
				)
			});
		}
	}

	render() {
		return (
				<div className="wiki_block" onClick={this.onTermClick}>
					{this.props.children}
					{this.state.modal}
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