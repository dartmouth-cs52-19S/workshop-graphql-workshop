import React, { Component } from 'react';
import { Typography, Modal } from '@material-ui/core';

class CommitsModal extends Component {
  render() {
    const { classes, repo } = this.props;

    function getModalStyle() {
      const top = 50;
      const left = 50;

      return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
      };
    }
    const commits = repo.defaultBranchRef ? repo.defaultBranchRef.target.history.edges : [];
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.modalOpen}
        onClose={this.props.handleModalClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <div className="modal-repo">
            <Typography variant="h6" id="modal-title">
              {repo.name}
            </Typography>
            <i className="fa fa-window-close" onClick={this.props.handleModalClose} aria-hidden="true" />
          </div>
          {
            commits.map(commit => (
              <div className="commit-modal-info" key={commit.node.message}>
                <div className="commit-modal-message">
                  <Typography variant="subtitle1" id="simple-modal-description">
                    {commit.node.message}
                  </Typography>
                </div>
                <div className="commit-modal-date">
                  <Typography variant="subtitle1" id="simple-modal-description">
                    {commit.node.committedDate.split('T')[0]}
                  </Typography>
                </div>
              </div>
            ))
          }

        </div>
      </Modal>
    );
  }
}

export default CommitsModal;
