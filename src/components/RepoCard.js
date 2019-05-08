import React, { Component } from 'react';
import {
  Typography, Card, CardActions, CardContent, Button,
} from '@material-ui/core';
import CommitsModal from './CommitsModal';

class RepoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      isStared: props.repo.viewerHasStarred,
    };
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  onStarClick = (event) => {
    if (event.target.className === 'far fa-star') {
      this.setState({ isStared: true });
    } else {
      this.setState({ isStared: false });
    }
  }

  renderStar = (isStared) => {
    if (isStared) {
      return (
        <div className="star-div" onClick={this.onStarClick} role="button" tabIndex={0}>
          <i className="fa fa-star" style={{ fontSize: '24px', color: 'yellow' }} />
        </div>
      );
    } else {
      return (
        <div className="star-div" onClick={this.onStarClick} role="button" tabIndex={0}>
          <i className="far fa-star" style={{ fontSize: '24px', color: 'yellow' }} />
        </div>
      );
    }
  }

  render() {
    const { classes, repo } = this.props;
    console.log(repo);
    return (
      <Card key={repo.id} className={classes.card}>
        <CommitsModal repo={repo} modalOpen={this.state.modalOpen} handleModalClose={this.handleModalClose} classes={classes} />
        <CardContent>
          <div className="title-star">
            <Typography gutterBottom variant="h5" component="h2">
              {repo.name}
            </Typography>
            {this.renderStar(this.state.isStared)}

          </div>
          <Typography gutterBottom component="p">
            {repo.description}
          </Typography>
          <Typography className="tags" component="p" style={{ fontStyle: 'italic', textAlign: 'right', marginBottom: '8%' }}>
            Created On: {repo.createdAt.split('T')[0]}
          </Typography>

        </CardContent>
        <CardActions style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          position: 'absolute',
          width: '100%',
          bottom: '0px',
          alignItems: 'flex-end',
        }}
        >
          <Button size="small" onClick={this.handleModalOpen} color="primary">
            View Commits
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default RepoCard;
