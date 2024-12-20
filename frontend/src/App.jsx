// src/App.js
import React, { Children, useEffect } from 'react';
import { RouterProvider,createBrowserRouter,Routes, createRoutesFromElements, Route, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Signup from './components/Signup';
import Login from './components/Login';
import UserContextProvider from './context/UserContextProvider.jsx';
import Home from './components/Home.jsx'
import BlogDetails from './components/BlogDetails.jsx';
import BlogList from './components/BlogsList.jsx';
import PodcastList from './components/Podcastlist.jsx';
import Dashboard from './components/Dashboard.jsx'
import Logout from './components/Logout.jsx';
import CreateBlog from './pages/CreateBlog.jsx';
import CreatePodcast from './pages/CreatePodcast.jsx';
import { useAuth } from './context/UserContext.js';
import UpdateBlog from './pages/UpadateBlog.jsx';
import DeleteBlog from './pages/DeleteBlog.jsx';
import DeletePodcast from './pages/DeletePodcast.jsx';
import About from './pages/About.jsx';
//  Define routes
//  Define routes
const ProtectedRoute = ({ children }) => {

  const { user } = useAuth();
  const navigate = useNavigate();


}
 
const router = createBrowserRouter(
  createRoutesFromElements(

   <Route path='/' element={<Layout/>}>
    <Route path="/signup" element= {<Signup/>}/>
    <Route path="/login" element = {<Login/>}/>
    <Route path="" element = {<Home/>} />
    <Route path= "/blogs" element = {<BlogList/>} />
    <Route path="/blog/:id" element = {<BlogDetails/>}/>
    <Route path="/podcasts" element = {<PodcastList/>} />
    <Route path="/logout" element={<Logout /> } />


    <Route path="/dashboard" element={<Dashboard /> } />
      <Route path="/createBlog" element={<CreateBlog />} />
      <Route path="/createPodcast" element={<CreatePodcast />} />
      <Route path="/updateBlog/:blogId" element={<UpdateBlog />} />
      <Route path="/deleteBlog/:blogId" element = {<DeleteBlog/>}/>
      <Route path="/deletePodcast/:podcastId" element = {<DeletePodcast/>}/>
      <Route path="/about" element={<About />} /> 


      


   </Route>
  )
 

);


function App () {
  return (
    <UserContextProvider>
<RouterProvider router={router} />
    </UserContextProvider>
  )
      
}

export default App;
