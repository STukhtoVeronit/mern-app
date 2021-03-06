import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../common/Spinner';
import {getPost} from "../../actions/postActions";
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import isEmpty from "../../validation/is-empty";

class Post extends PureComponent {
	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	render() {
		const {post, loading} = this.props.post;
		let postContent;
		if (loading)  {
			postContent = <Spinner/>
		} else if(isEmpty(post)){
			postContent = <Spinner/>
		}else {
			postContent = (
					<div>
						<PostItem post={post} showActions={false}/>
						<CommentForm postId={post._id}/>
						<CommentFeed comments={post.comments} postId={post._id}/>
					</div>
			)
		}

		return (
				<main>
					<div className="container">
						<div className="post">
							<div className="container">
								<div className="row">
									<div className="col-md-12">
										<Link to="/feed" className="btn btn-light mb-3">
											Back to feed
										</Link>
									</div>
								</div>
								{postContent}

							</div>
						</div>
					</div>
				</main>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, {getPost})(Post);