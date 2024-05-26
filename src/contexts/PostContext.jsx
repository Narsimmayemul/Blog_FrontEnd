// src/context/PostContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/posts?page=${page}`);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Fetch Posts Error', error);
      }
    };
    fetchPosts();
  }, [page]);

  const fetchPostById = async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      setCurrentPost(response.data);
    } catch (error) {
      console.error('Fetch Post Error', error);
    }
  };

  const createPost = async (post) => {
    const response = await api.post('/posts', post);
    setPosts([...posts, response.data]);
  };

  const updatePost = async (id, updatedPost) => {
    const response = await api.put(`/posts/${id}`, updatedPost);
    setPosts(posts.map((post) => (post._id === id ? response.data : post)));
  };

  const deletePost = async (id) => {
    await api.delete(`/posts/${id}`);
    setPosts(posts.filter((post) => post._id !== id));
  };

  const likePost = async (id) => {
    const response = await api.post(`/posts/${id}/like`);
    setPosts(posts.map((post) => (post._id === id ? response.data : post)));
  };

  const addComment = async (postId, comment) => {
    const response = await axios.post(`https://blog-backend-n7v3.onrender.com/api/posts/${postId}/comments`, { comment });
    setCurrentPost({ ...currentPost, comments: [...currentPost.comments, response.data] });
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        currentPost,
        totalPages,
        page,
        setPage,
        fetchPostById,
        createPost,
        updatePost,
        deletePost,
        likePost,
        addComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
