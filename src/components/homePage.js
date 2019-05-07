import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchResults } from '../actions';

// repos commits issues
/* Some UI Components adapted from Material UI */
const styles = theme => ({
  card: {
    position: 'relative',
    marginBottom: '3%',
    minWidth: '25%',
    maxWidth: '25%',
    marginTop: '3%',
    marginLeft: '5%',

  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '70%',
  },
  input: {
    display: 'none',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.renderResults = this.renderResults.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
  }

  state = {
    anchorEl: null,
    searchTerm: '',
    modalOpen: false,
  };

  componentDidMount() {
    this.props.fetchResults();
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  onSearchChange = (event) => {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit = (event) => {
    event.preventDefault();
    console.log(`Pressed keyCode ${event.key}`);
  }

  renderResults() {
    const { classes } = this.props;

    // repo name
    // created date
    // description
    // github url
    // modal to show details
    // star
    return (
      <Card key="1" className={classes.card}>
        <CardContent>
          <div className="title-star">
            <Typography gutterBottom variant="h5" component="h2">
              Sample Title
            </Typography>
            <i className="fa fa-star" style={{ fontSize: '24px', color: 'yellow' }} />
          </div>
          <Typography gutterBottom component="p">
            Sample Description
          </Typography>
          <Typography className="tags" component="p" style={{ fontStyle: 'italic', textAlign: 'right', marginBottom: '8%' }}>
            Created On: 01/01/1970
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
          <Button size="small" onClick={() => this.handleModalOpen()} color="primary">
            View Details
          </Button>
        </CardActions>
      </Card>

    );
  }

  renderSearchBar() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className="home-page-search">
        <TextField
          id="standard-uncontrolled"
          label="Search Term"
          className={classes.textField}
          onChange={this.onSearchChange}
          value={this.state.searchTerm}
          onKeyPress={(e) => { if (e.key === 'Enter') { this.onSearchSubmit(e); } }}
          margin="normal"
        />

        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Filter
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Repos</MenuItem>
          <MenuItem onClick={this.handleClose}>Commits</MenuItem>
          <MenuItem onClick={this.handleClose}>Stared</MenuItem>
        </Menu>
      </div>
    );
  }

  renderModal() {
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <div className="modal-repo">
            <Typography variant="h6" id="modal-title">
              Repo Name
            </Typography>
            <i className="fa fa-window-close" onClick={() => this.handleModalClose()} aria-hidden="true" />
          </div>
          <Typography variant="subtitle1" id="simple-modal-description">
            Repo Details
          </Typography>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div className="home-page">
        {this.renderSearchBar()}
        <div className="home-page-results">
          {this.renderResults()}
        </div>
        {this.renderModal()}
      </div>

    );
  }
}

const mapStateToProps = state => (
  {
    results: state.results,
  }
);

export default withStyles(styles)(withRouter(connect(mapStateToProps, { fetchResults })(HomePage)));
