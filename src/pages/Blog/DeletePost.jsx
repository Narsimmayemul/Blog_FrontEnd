import React, { useState } from 'react';
import axios from 'axios';

const Post = ({ postId }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`https://blog-backend-n7v3.onrender.com/api/posts/${postId}`);
    //   onDelete(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default Post;
