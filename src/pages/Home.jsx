import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext.jsx';
import styles from './Home.module.css'; 
import { useNavigate } from 'react-router-dom';
import Post from './Blog/DeletePost.jsx';


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState([]);
    const isAuthenticated  = useContext(AuthContext);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://blog-backend-n7v3.onrender.com/api/posts?page=1');
                setPosts(response.data);
                console.log(response)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated.user==null) {
            navigate('/Login');
        }else{
            navigate("/");
            fetchPosts();
        }
    }, [isAuthenticated]);
    console.log(isAuthenticated);
    
    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };
const handleComments = (id)=>{
    navigate(`com/${id}`);
}
    const handleDelete = async (id) => {
        try {
            console.log(id);
          await axios.delete(`https://blog-backend-n7v3.onrender.com/api/posts/${id}`);
            console.log('deleted')
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: Failed to fetch posts</div>;
    if (!isAuthenticated.user) return <div>Please log in to view the posts.</div>;
    // console.log(posts);
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Home Page</h1>
            <button onClick={()=>navigate("/post")}>CreatePost</button>
            {posts.length > 0 ? (
                <div className={styles.flex}>

                {/* <ul className={styles.postList}> */}
                    {posts.map(post => (
                        <div key={post._id} className={styles.postContainer}>
                            
                            <h2 className={styles.postItem}>Posted By  :   {post.authorId.username}</h2>
                            <h2 className={styles.postItem}>{post.title}</h2>
                            <p className={styles.ptag}>{post.content}</p>
                            <button onClick={()=>handleEdit(post._id)}>Edit Post</button>
                            {/* <button onClick={()=>handleDelete(post._id)}>Delete Post</button> */}
                            <button onClick={()=>{handleComments(post._id)}}>Comments</button>
                        </div>
                    ))}
                {/* </ul> */}
                    </div>
            ) : (
                <p>No posts available</p>
            )}

        </div>
    );
};

export default Home;
