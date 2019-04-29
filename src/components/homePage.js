import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.renderPosts = this.renderPosts.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li key={post.id} className="post">
          <Link to={{
            pathname: `/posts/${post.id}`,
          }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{post.tags}</p>
            <p>{post.coverUrl}</p>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <ul>
        {this.renderPosts()}
      </ul>

    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(HomePage));
