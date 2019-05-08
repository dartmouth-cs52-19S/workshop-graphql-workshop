import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchCards from './SearchCards';

/* Some UI Components adapted from Material UI */
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
            <div className="menu-toolbar">
              <Typography variant="h4" color="inherit">
                Github Search Tool
              </Typography>
            </div>
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
          <Route exact path="/" component={SearchCards} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default withStyles(styles)(App);
