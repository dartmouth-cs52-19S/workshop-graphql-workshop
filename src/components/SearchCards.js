import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

class SearchCards extends Component {
  constructor(props) {
    super(props);
    this.renderSearchBar = this.renderSearchBar.bind(this);
  }

  state = {
    searchTerm: '',
    lastSearchTerm: '',
  };

  componentDidMount() {
  }

  handleClick = (event) => {
    return null;
  };


  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit = () => {
    const { searchTerm } = this.state;
    this.setState({ lastSearchTerm: searchTerm });
    this.props.fetchRepos(searchTerm);
  }


  renderSearchBar() {
    const { classes } = this.props;

    return (
      <div className="home-page-search">
        <TextField
          id="standard-uncontrolled"
          label="Search Term"
          className={classes.textField}
          onChange={this.onSearchChange}
          value={this.state.searchTerm}
          margin="normal"
        />
        <Button size="small" color="primary" onClick={this.onSearchSubmit} style={{ paddingTop: '1%' }}>
          Search User
        </Button>
      </div>
    );
  }

  render() {
    const { lastSearchTerm } = this.state;

    if (this.props.repos.repos && this.props.repos.repos.length > 0) {
      return (
        <div className="home-page">
          {this.renderSearchBar()}
          <div className="home-page-results">
            {this.props.repos.repos.map((repo) => {
              return (
                <RepoCard key={repo.id} classes={this.props.classes} repo={repo} handleModalOpen={this.handleModalOpen} lastSearchTerm={lastSearchTerm} />
              );
            })}
          </div>
        </div>
      );
    }
    return (
      <div className="home-page">
        {this.renderSearchBar()}
      </div>
    );
  }
}

const mapStateToProps = ({ repos }) => ({ repos });

const mapDispatchToProps = {
  fetchRepos,
};


export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchCards)));
