import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchRepos } from '../actions';
import RepoCard from './RepoCard';

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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.renderSearchBar = this.renderSearchBar.bind(this);
  }

  state = {
    anchorEl: null,
    searchTerm: '',
  };

  componentDidMount() {
    this.props.fetchRepos('theodorewahle');
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  onSearchChange = (event) => {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit = (event) => {
    event.preventDefault();
    console.log(`Pressed keyCode ${event.key}`);
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

  render() {
    console.log('these are the rpops', this.props);
    return (
      <div className="home-page">
        {this.renderSearchBar()}
        <div className="home-page-results">
          {this.props.repos.repos.map((repo) => {
            return (
              <RepoCard key={repo.name} classes={this.props.classes} repo={repo} handleModalOpen={this.handleModalOpen} />
            );
          })}
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => (
  {
    repos: state.repos,
  }
);

export default withStyles(styles)(withRouter(connect(mapStateToProps, { fetchRepos })(HomePage)));
