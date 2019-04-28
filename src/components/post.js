import React from 'react';
import { NavLink } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';


const Post = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <li><NavLink exact to="/">Back to Home</NavLink></li>
          <li><button type="button">Delete</button></li>
        </ul>
      </nav>
      <div className="post-display">
        <img src="../img/puppy.jpg" alt="puppy" />
        <TextareaAutosize
          minRows={3}
          maxRows={6}
          placeholder="Post Title"
        />
        <TextareaAutosize
          minRows={3}
          maxRows={6}
          placeholder="Post Content"
        />
        <TextareaAutosize
          minRows={3}
          maxRows={6}
          placeholder="tags"
        />
      </div>
    </div>
  );
};

export default Post;
