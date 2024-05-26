import React, { useState, useContext } from 'react';
import axios from 'axios';
import  AuthContext  from '../../contexts/AuthContext';
import styles from './CreatePost.module.css'; 
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!title || !content) {
            setError('Title and content are required');
            return;
        }

        try {
            const response = await axios.post('https://blog-backend-n7v3.onrender.com/api/posts', {
                title,
                content,
                author: user._id 
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}` 
                }
            });

            if (response.status === 201) {
                setSuccess('Post created successfully');
                setTitle('');
                setContent('');
            }
        } catch (err) {
            setError('Failed to create post');
        }
    };
const navigate = useNavigate();
    if (!user) return <div>Please log in to create a post.</div>;
// console.log('postPage')
    return (
        <div className={styles.container}>
                    <button onClick={()=>navigate("/")}>Go to Home</button>
            <h1 className={styles.title}>Create Post</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="content" className={styles.label}>Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={styles.textarea}
                    />
                </div>
                <button type="submit" className={styles.button}>Create Post</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
        </div>
    );
};

export default CreatePost;
