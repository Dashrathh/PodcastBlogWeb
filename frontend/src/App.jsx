// src/App.js
import React from 'react';
import { RouterProvider,createBrowserRouter,Routes, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout';
import Signup from './components/Signup';
import Login from './components/Login';
import UserContextProvider from './context/UserContextProvider';
import Home from './components/Home.jsx'
import BlogDetails from './components/BlogDetails.jsx';
import BlogList from './components/BlogsList.jsx';
import PodcastList from './components/Podcastlist.jsx';
import Dashboard from './components/Dashboard.jsx'
import Logout from './components/Logout.jsx';
import CreateBlog from './pages/CreateBlog.jsx';

//  Define routes

const router = createBrowserRouter(
  createRoutesFromElements(

   <Route path='/' element={<Layout/>}>
    <Route path="/signup" element= {<Signup/>}/>
    <Route path="/login" element = {<Login/>}/>
    <Route path="" element = {<Home/>} />
    <Route path= "/blogs" element = {<BlogList/>} />
    <Route path="/blog/:id" element = {<BlogDetails/>}/>
    <Route path="/podcasts" element = {<PodcastList/>} />
    <Route path="Dashboard" element = {<Dashboard/>}/>
    <Route path="/logout" element={<Logout /> } />
    <Route path="/createBlog" element = {<CreateBlog/>}/>



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
