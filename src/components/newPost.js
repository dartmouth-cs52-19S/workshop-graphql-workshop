import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
      coverUrl: '',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onCreateNewPost = this.onCreateNewPost.bind(this);
  }

  onTitleChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  onContentChange(event) {
    event.preventDefault();
    this.setState({ content: event.target.value });
  }

  onTagsChange(event) {
    event.preventDefault();
    this.setState({ tags: event.target.value });
  }

  onUrlChange(event) {
    event.preventDefault();
    this.setState({ coverUrl: event.target.value });
  }

  onCreateNewPost(event) {
    event.preventDefault();
    this.props.createPost(this.state, this.props.history);
  }

  render() {
    return (
      <div className="new-post">
        <h2>Create A New Post </h2>
        <input className="new-post-input" placeholder="title" onChange={this.onTitleChange} value={this.state.title} />
        <input className="new-post-input" placeholder="content" onChange={this.onContentChange} value={this.state.content} />
        <input className="new-post-input" placeholder="tags" onChange={this.onTagsChange} value={this.state.tags} />
        <input className="new-post-input" placeholder="cover_url" onChange={this.onUrlChange} value={this.state.coverUrl} />
        <div className="new-post-buttons">
          <button type="button" onClick={this.onCreateNewPost}>Create</button>
          <button type="button" onClick={() => this.props.history.push('/')}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { createPost })(NewPost));
