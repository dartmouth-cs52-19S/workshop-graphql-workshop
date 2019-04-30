/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { fetchPost, deletePost, updatePost } from '../actions';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      post: {
        id: this.props.match.params.postID,
        title: '',
        content: '',
        tags: '',
        coverUrl: '',
      },

    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  onTitleChange(event) {
    event.preventDefault();
    this.setState({
      post: {
        ...this.state.post,
        title: event.target.value,
      },
    });
  }

  onContentChange(event) {
    event.preventDefault();
    this.setState({
      post: {
        ...this.state.post,
        content: event.target.value,
      },
    });
  }

  onTagsChange(event) {
    event.preventDefault();
    this.setState({
      post: {
        ...this.state.post,
        tags: event.target.value,
      },
    });
  }

  onUrlChange(event) {
    event.preventDefault();
    this.setState({
      post: {
        ...this.state.post,
        coverUrl: event.target.value,
      },
    });
  }

  onDelete(event) {
    event.preventDefault();
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  onEdit(event) {
    event.preventDefault();
    this.setState(
      {
        isEditing: true,
        post: {
          ...this.state.post,
          title: this.props.post.title,
          content: this.props.post.content,
          tags: this.props.post.tags,
          coverUrl: this.props.post.url,
        },
      },
    );
  }

  onCancel(event) {
    event.preventDefault();
    this.setState(
      {
        isEditing: false,
      },
    );
  }


  onSave(event) {
    event.preventDefault();
    this.setState({ isEditing: false });
    this.props.updatePost(this.state.post, this.props.history);
  }

  renderButtons(classes) {
    if (this.state.isEditing) {
      return (
        <div className="post-header">
          <Button variant="contained" color="secondary" onClick={this.onCancel} className={classes.button}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={this.onSave} className={classes.button}>
            Save
          </Button>
        </div>
      );
    } else {
      return (
        <div className="post-header">
          <Button variant="contained" color="secondary" onClick={this.onDelete} className={classes.button}>
            Delete
          </Button>
          <Button variant="contained" color="secondary" onClick={this.onEdit} className={classes.button}>
            Edit
          </Button>
        </div>
      );
    }
  }

  renderPost() {
    if (this.state.isEditing) {
      return (
        <div className="post-display">
          <img src="../img/puppy.jpg" alt="puppy" />
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            placeholder="Post Title"
            onChange={this.onTitleChange}
            value={this.state.post.title}
          />
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            placeholder="Post Content"
            onChange={this.onContentChange}
            value={this.state.post.content}
          />
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            placeholder="tags"
            onChange={this.onTagsChange}
            value={this.state.post.tags}
          />
        </div>
      );
    } else {
      return (
        <div className="post-display">
          <img src="https://www.google.com/search?q=puppy+images
            &rlz=1C5AVSZ_enUS680US680&tbm=isch&source=iu&ictx=1&
            fir=oIyUVmRYtXjk-M%253A%252C5KMC1IX1OWFb4M%252C_&vet=1&
            usg=AI4_-kRkvU6jhTDWCLFCfZh0P8IBBh9FaA&sa=X&ved=2ahUKEwjc4ZzZrvbhAhUFj1kKHTP_DPIQ9QEwAHoECAYQBA&biw=1440&bih=788#"
            alt="puppy"
          />
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
            value={this.props.post.content}
          />
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            placeholder="tags"
            value={this.props.post.tags}
          />
        </div>
      );
    }
  }
  // On edit turn to true
  // Create new post from values

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.renderPost(classes)}
        {this.renderButtons(classes)}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    post: state.posts.current,
  }
);

export default withStyles(styles)(withRouter(connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post)));
