import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createPost } from '../actions';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '70%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
      cover_url: '',
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
    this.setState({ cover_url: event.target.value });
  }

  onCreateNewPost(event) {
    event.preventDefault();
    this.props.createPost(this.state, this.props.history);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="new-post">
        <h2>Create A New Post </h2>
        <TextField
          id="standard-uncontrolled"
          label="Post Title"
          className={classes.textField}
          onChange={this.onTitleChange}
          value={this.state.title}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Content"
          className={classes.textField}
          onChange={this.onContentChange}
          value={this.state.content}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Tags"
          className={classes.textField}
          onChange={this.onTagsChange}
          value={this.state.tags}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Photo Url"
          className={classes.textField}
          onChange={this.onUrlChange}
          value={this.state.cover_url}
          margin="normal"
        />
        <div className="new-post-buttons">
          <Button variant="contained" color="secondary" onClick={() => this.props.history.push('/')} className={classes.button}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={this.onCreateNewPost} className={classes.button}>
            Create
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(connect(null, { createPost })(NewPost)));
