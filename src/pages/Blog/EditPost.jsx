import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AuthContext from '../../contexts/AuthContext';
import styles from './EditPost.module.css';

const EditPost = () => {
  const { id } = useParams();
//   console.log(id)
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Failed to fetch the post.');
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`Updating post with ID: ${id}`);
      await api.put(`/posts/${id}`, post, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate('/');
    } catch (err) {
      console.log(err);
      setError('Failed to update the post.');
    }
  };
  

  return (
    <div className={styles.container}>
      <h2>Edit Post</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.button}>Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
