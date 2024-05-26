import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from '../../contexts/PostContext';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const { currentPost, fetchPostById, addComment, likePost } = useContext(PostContext);
  const [comment, setComment] = useState('');
  const [com, setCom] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const feactCom = async(id)=>{
    try {
        const data = await axios.get(`https://blog-backend-n7v3.onrender.com/api/posts/${id}/comments`);
        // console.log(data.comment)
        setCom(data.data)
        console.log(data.data)
    } catch (error) {
        console.log(error)
    }
  }


  useEffect(() => {
    fetchPostById(id);
    feactCom(id)
  }, [id, fetchPostById]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(id, comment);
    setComment('');
  };


//   /api/posts/:postId/comments
  return currentPost ? (
    <div style={{width:'100%' , display:'flex',flexDirection:'column' , marginLeft:'150px' , justifyContent:'center'}}>
      <h2>{currentPost.title}</h2>
      <p>{currentPost.content}</p>
      <button onClick={() => value==1?setValue(0):setValue(1)}>
        Like ({value})
      </button>
      <h3>Comments</h3>
      <ul>
        {com?.map((comment) => (
          <li key={comment._id}>{comment.comment}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} required />
        <button type="submit">Add Comment</button>
      </form>
      <button onClick={()=> navigate("/")}>Back To home</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default PostDetail;
