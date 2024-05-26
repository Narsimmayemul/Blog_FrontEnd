import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
// import Post from './pages/Blog/PostDetail';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import CreatePost from './pages/Blog/CreatePost';
import EditPost from './pages/Blog/EditPost';
import PostDetail from './pages/Blog/PostDetail';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <PostProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/post" element={<CreatePost />} />
                        <Route path="/edit/:id" element={<EditPost />} />
                        <Route path="/com/:id" element={<PostDetail />} />
                    </Routes>
                </PostProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
