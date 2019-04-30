/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { fetchPost, deletePost, updatePost } from '../actions';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    minWidth: '90%',
    maxWidth: '90%',
    minHeight: '50%',
    marginTop: '3%',
    height: '100%',
    width: '100%',

  },
  media: {
    minHeight: 450,
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
        cover_url: '',
      },

    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
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
        cover_url: event.target.value,
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
          cover_url: this.props.post.cover_url,
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

  renderPost(classes) {
    if (this.state.isEditing) {
      return (
        <Card key={this.state.post.id} className={classes.card}>
          <CardMedia
            style={{ height: '100%', width: '100%', pointerEvents: 'none' }}
            className={classes.media}
            image={this.state.post.cover_url}
            title="Post Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <TextareaAutosize
                minRows={3}
                maxRows={6}
                placeholder="Post Title"
                onChange={this.onTitleChange}
                value={this.state.post.title}
              />
            </Typography>
            <Typography component="p">
              <TextareaAutosize
                minRows={3}
                maxRows={6}
                placeholder="Post Content"
                onChange={this.onContentChange}
                value={this.state.post.content}
              />
            </Typography>
            <Typography component="p">
              <TextareaAutosize
                minRows={3}
                maxRows={6}
                placeholder="tags"
                onChange={this.onTagsChange}
                value={this.state.post.tags}
              />
            </Typography>
            <Typography component="p">
              <TextareaAutosize
                minRows={3}
                maxRows={6}
                placeholder="tags"
                onChange={this.onUrlChange}
                value={this.state.post.cover_url}
              />
            </Typography>
          </CardContent>

          <CardActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button size="small" color="primary" onClick={this.onCancel}>
              Cancel
            </Button>
            <Button size="small" color="primary" onClick={this.onSave}>
              Save
            </Button>
          </CardActions>
        </Card>
      );
    } else {
      return (
        <Card key={this.props.post.id} className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.props.post.cover_url}
            title="Post Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.post.title}
            </Typography>
            <Typography component="p">
              {this.props.post.content}
            </Typography>
            <Typography component="p">
              {this.props.post.tags}
            </Typography>
          </CardContent>
          <CardActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button size="small" color="primary" onClick={this.onDelete}>
              Delete
            </Button>
            <Button size="small" color="primary" onClick={this.onEdit}>
              Edit
            </Button>
          </CardActions>
        </Card>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="view-post">
        {this.renderPost(classes)}
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
