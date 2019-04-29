import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, NavLink,
} from 'react-router-dom';
import HomePage from './homePage';
import NewPost from './newPost';
import Post from './post';

const App = () => {
  const FallBack = () => {
    return (
      <div>
        URL Not Found
      </div>
    );
  };

  const Nav = () => {
    return (
      <nav id="main-header">
        <ul id="header-list">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/post/new">Add New Post</NavLink></li>
        </ul>
      </nav>
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

export default App;
