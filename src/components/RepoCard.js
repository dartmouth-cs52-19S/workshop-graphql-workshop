import React, { Component } from 'react';
import {
  Typography, Card, CardActions, CardContent, Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import CommitsModal from './CommitsModal';
import { fetchRepos, addStar, removeStar } from '../actions';

class RepoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  onStarClick = async (event) => {
    const { repo, lastSearchTerm } = this.props;

    if (repo.viewerHasStarred) {
      await this.props.removeStar(repo.id, lastSearchTerm);
    } else {
      await this.props.addStar(repo.id, lastSearchTerm);
    }
  }


  render() {
    const { classes, repo } = this.props;
    return (
      <Card key={repo.id} className={classes.card}>
        <CommitsModal repo={repo} modalOpen={this.state.modalOpen} handleModalClose={this.handleModalClose} classes={classes} />
        <CardContent>
          <div className="title-star">
            <Typography gutterBottom variant="h5" component="h2">
              {repo.name}
            </Typography>
            {this.props.repo.viewerHasStarred && (
              <div className="star-div" onClick={this.onStarClick} role="button" tabIndex={0}>
                <i className="fa fa-star" style={{ fontSize: '24px', color: 'orange' }} />
              </div>
            )}
            {!this.props.repo.viewerHasStarred && (
              <div className="star-div" onClick={this.onStarClick} role="button" tabIndex={0}>
                <i className="far fa-star" style={{ fontSize: '24px', color: 'orange' }} />
              </div>
            )}
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


const mapStateToProps = ({ repos }) => ({ repos });

const mapDispatchToProps = {
  addStar,
  removeStar,
  fetchRepos,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepoCard);
