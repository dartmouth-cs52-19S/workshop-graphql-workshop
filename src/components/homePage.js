import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchPosts } from '../actions';

const styles = {
  card: {
    minWidth: '25%',
    maxWidth: '25%',
    marginTop: '3%',
    marginLeft: '5%',

  },
  media: {
    height: 140,
  },
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.renderPosts = this.renderPosts.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    const { classes } = this.props;
    return this.props.posts.map((post) => {
      return (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={post.coverUrl}
              title="Post Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography className="tags" component="p">
                {post.tags}
              </Typography>
              <Typography component="p">
                {post.content}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              <Link to={{
                pathname: `/posts/${post.id}`,
              }}
              >
                View Post
              </Link>
            </Button>
          </CardActions>
        </Card>
      );
    });
  }

  render() {
    return (
      <div className="home-page-posts">
        {this.renderPosts()}
      </div>

    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts.all,
  }
);

export default withStyles(styles)(withRouter(connect(mapStateToProps, { fetchPosts })(HomePage)));
