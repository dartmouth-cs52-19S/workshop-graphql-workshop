import React from 'react';


const NewPost = (props) => {
  return (
    <div>
      <h2>Create A New Post </h2>
      <input placeholder="title" />
      <input placeholder="tags" />
      <input placeholder="content" />
      <input placeholder="cover_url" />
      <button type="button">Submit</button>
      <button type="button">Cancel</button>
    </div>
  );
};

export default NewPost;
