import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import {getPosts} from "../../actions/postActions";
import PostFeed from "./PostFeed";
import isEmpty from "../../validation/is-empty";
import history from "../../history";

class Posts extends PureComponent {
	componentDidMount() {
		this.props.getPosts(10, 1);//perPage, page
	}

	handlePageClick = (data) => {
		// let offset = Math.ceil(data.selected * this.props.perPage);
		console.log(data);
		this.props.getPosts(10, data.selected + 1);
	};

	render() {
		const {posts, loading} = this.props.post;
		let postsContent;
		let postsPagination;

		if (loading) {
			postsContent = <Spinner/>
		}
		else if (!isEmpty(this.props.errors) && this.props.errors.response.status === 500) {
			// history.push('/not-found');
			postsContent = this.props.errors.response.statusText + ": server has hard day T-T, please try again";
		}
		else /*if (!isEmpty(posts.docs))*/ {
			postsContent = (<PostFeed posts={posts}/>);
			postsPagination = (<ReactPaginate pageCount={posts.pages}
																				marginPagesDisplayed={2}
																				initialPage={parseInt(posts.page, 10) - 1}
																				onPageChange={this.handlePageClick}
																				disableInitialCallback={true}
																				pageRangeDisplayed={6}
																				containerClassName={"pagination"}
																				subContainerClassName={"pages pagination"}
																				activeClassName={"active"}/>);

			//	 <ReactPaginate previousLabel={"previous"}
			//                        nextLabel={"next"}
			//                        breakLabel={<a href="">...</a>}
			//                        breakClassName={"break-me"}
			//                        pageCount={this.state.pageCount}
			//                        marginPagesDisplayed={2}
			//                        pageRangeDisplayed={5}
			//                        onPageChange={this.handlePageClick}
			//                        containerClassName={"pagination"}
			//                        subContainerClassName={"pages pagination"}
			//                        activeClassName={"active"} />
		}
		return (
				<main>
					<div className="container">
						<div className='feed'>
							<div className="container">
								<div className="row">
									<div className="col-md-12">
										<PostForm/>
										{postsContent}
										{postsPagination}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
		);
	}
}

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
	errors: PropTypes.object
};

const mapStateToProps = state => ({
	post: state.post,
	errors: state.errors
});

export default connect(mapStateToProps, {getPosts})(Posts);