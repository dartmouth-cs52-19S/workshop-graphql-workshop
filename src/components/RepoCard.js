import React, { Component } from 'react';
import {
  Typography, Card, CardActions, CardContent, Button,
} from '@material-ui/core';
import CommitsModal from './CommitsModal';

class RepoCard extends Component {
  state = {
    modalOpen: false,
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { classes, repo } = this.props;
    return (
      <Card key="1" className={classes.card}>
        <CommitsModal repo={repo} modalOpen={this.state.modalOpen} handleModalClose={this.handleModalClose} classes={classes} />
        <CardContent>
          <div className="title-star">
            <Typography gutterBottom variant="h5" component="h2">
              {repo.name}
            </Typography>
            <i className="fa fa-star" style={{ fontSize: '24px', color: 'yellow' }} />
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
