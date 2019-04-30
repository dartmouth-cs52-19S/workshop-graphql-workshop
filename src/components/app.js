import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, NavLink,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Post from './post';
import NewPost from './newPost';
import HomePage from './homePage';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};
const App = () => {
  const FallBack = () => {
    return (
      <div>
        URL Not Found
      </div>
    );
  };

  const Nav = (props) => {
    const classes = props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <NavLink variant="h6" color="inherit" exact to="/">Home</NavLink>
            <Typography variant="h6" color="inherit">
              Welcome to your Blog
            </Typography>
            <NavLink variant="h6" color="inherit" to="/post/new">Add New Post</NavLink>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/post/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default withStyles(styles)(App);
