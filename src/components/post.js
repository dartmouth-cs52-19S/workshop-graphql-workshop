/* eslint-disable react/no-danger */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { fetchPost, deletePost, updatePost } from '../actions';


/* Some UI Components adapted from Material UI */
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    minWidth: '90%',
    maxWidth: '90%',
    minHeight: '50%',
    maxHeight: '75%',
    marginTop: '3%',
    marginBottom: '3%',

  },
  media: {
    height: 0,
    paddingTop: '56.25%',
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
    this.props.updatePost(this.state.post, this.props.history);
    // This is to prevent the user from seeing the data load in
    setTimeout(() => { this.setState({ isEditing: false }); }, 200);
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
            <Typography
              gutterBottom
              component="h2"
              style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}
            >
              <p className="edit-label bold">Title:</p>
              <TextareaAutosize
                style={{
                  fontSize: '1.5rem',
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 400,
                  marginBottom: '1%',
                  lineHeight: 1.33,
                  letterSpacing: '0em',
                  display: 'block',
                  minHeight: '100%',
                  minWidth: '99%',
                  maxWidth: '99%',
                  border: '0.05em solid lightgrey',
                }}
                minRows={3}
                maxRows={6}
                placeholder="Post Title"
                onChange={this.onTitleChange}
                value={this.state.post.title}
              />
            </Typography>
            <Typography
              component="h2"
              style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}
            >
              <p className="edit-label bold">Content:</p>
              <TextareaAutosize
                style={{
                  fontSize: '1em',
                  minWidth: '99%',
                  maxWidth: '99%',
                  border: '0.05em solid lightgrey',
                }}
                minRows={3}
                maxRows={6}
                placeholder="Post Content"
                onChange={this.onContentChange}
                value={this.state.post.content}
              />
            </Typography>
            <Typography
              component="h2"
              style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}
            >
              <p className="edit-label bold">Tags:</p>
              <TextareaAutosize
                style={{
                  fontSize: '1em',
                  minWidth: '99%',
                  maxWidth: '99%',
                  border: '0.05em solid lightgrey',
                }}
                minRows={3}
                maxRows={6}
                placeholder="tags"
                onChange={this.onTagsChange}
                value={this.state.post.tags}
              />
            </Typography>
            <Typography
              component="h2"
              style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}
            >
              <p className="edit-label bold">Cover Url:</p>
              <TextareaAutosize
                style={{
                  fontSize: '1em',
                  minWidth: '99%',
                  maxWidth: '99%',
                  border: '0.05em solid lightgrey',
                }}
                minRows={3}
                maxRows={6}
                placeholder="url"
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
            <Typography gutterBottom variant="h5" component="h2" style={{ borderBottom: '0.02em solid lightgray' }}>
              {this.props.post.title}
            </Typography>
            <Typography component="h2">
              <p dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
            </Typography>
            <Typography component="p" style={{ fontStyle: 'italic', textAlign: 'right' }}>
              tags: {this.props.post.tags}
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
