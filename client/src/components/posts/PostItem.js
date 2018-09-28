import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {deletePost, addLike} from '../../actions/postActions';


class PostItem extends PureComponent {
	onDeleteClick(id) {
		this.props.deletePost(id);
	}

	onLikeClick(id) {
		this.props.addLike(id);
	}

	findUserLike(likes) {
		const {auth} = this.props;
		return likes.filter(like => like.user === auth.user.id).length > 0;
	}


	render() {
		const {post, auth, showActions} = this.props;

		return (
				<div className="card card-body mb-3">
					<div className="row">
						<div className="col-md-2">
							<a href="profile.html">
								<img
										className="rounded-circle d-none d-md-block"
										src={post.avatar}
										alt=""
								/>
							</a>
							<br/>
							<p className="text-center">{post.name}</p>
						</div>
						<div className="col-md-10">
							<p className="lead">{post.text}</p>
							{showActions ? (
									<span>
                <button
										onClick={this.onLikeClick.bind(this, post._id)}
										type="button"
										className="btn btn-light mr-1">
                  <i
											className={classnames('fas fa-thumbs-up', {
												'text-info': post.hasOwnProperty("likes") ? this.findUserLike(post.likes) : 0
											})}/>
                  <span className="badge badge-light">{post.hasOwnProperty("likes") ? post.likes.length : 0}</span>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  {post.comments.length} Comments
                </Link>
										{post.user === auth.user.id ? (
												<button
														onClick={this.onDeleteClick.bind(this, post._id)}
														type="button"
														className="btn btn-danger mr-1">
													<i className="fas fa-times"/>
												</button>
										) : null}
              </span>
							) : null}
						</div>
					</div>
				</div>
		);
	}
}

PostItem.defaultProps = {
	showActions: true
};

PostItem.propType = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired
};

const MapStateToProps = state => ({
	auth: state.auth
});

export default connect(MapStateToProps, {deletePost, addLike})(PostItem);