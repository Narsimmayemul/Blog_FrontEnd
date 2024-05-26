// src/pages/Blog/PostList.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostContext from '../../contexts/PostContext';

const PostList = () => {
  const { posts, totalPages, page, setPage } = useContext(PostContext);

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;
