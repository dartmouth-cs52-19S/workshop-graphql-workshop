import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  onDelete(event) {
    event.preventDefault();
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  render() {
    return (
      <div>
        <div className="post-header">
          <button type="button" onClick={this.onDelete}>Delete</button>
        </div>
        <div className="post-display">
          <img src="../img/puppy.jpg" alt="puppy" />
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            placeholder="Post Title"
            value={this.props.post.title}
          />
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            placeholder="Post Content"
            value={this.props.post.title}
          />
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            placeholder="tags"
            value={this.props.post.title}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    post: state.posts.current,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPost, deletePost })(Post));
