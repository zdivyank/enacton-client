import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Brand from './components/brand/Brand';
import Category from './components/category/Category';
import Addproduct from './components/products/Addproduct';
import Updateproduct from './components/updatepage/Updateproduct';
import Updatecategory from './components/updatepage/Updatecategory';
import Updatebrand from './components/updatepage/Updatebrand';


function App() {
  return (
    <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/category" element={<Category />} />
      <Route path="/addproduct" element={<Addproduct />} />

      <Route path="product/:id/updateproduct" element={<Updateproduct />} />
      <Route path="category/:id/updatecategory" element={<Updatecategory />} />
      <Route path="brand/:id/updatebrand" element={<Updatebrand />} />

      {/* <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/editorschoice" element={<EditorsChoice />} />

      <Route path="/blog" element={<Blog />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/addpost" element={<Addpost />} />
      <Route path="/eachpost" element={<Singlepost />} />
      <Route path="/blog/:blog_id" element={<FullBlog />} />
      <Route path='/myblog/:_id' element={<Myblog />} />
      <Route path='/myblog/:_id/approved' element={<MyApprovedblogs />} />
      <Route path='/myblog/:_id/notapproved' element={<MyNotapprovedblogs />} />
      <Route path='/myblog/:_id/pending' element={<MypPendingblogs />} />
      <Route path='/myblog/:_id/profile' element={<Myprofile />} />
      <Route path='/myblog/:_id/update' element={<Update />} />
      <Route path='/popular' element={<Famous />} />
      <Route path='/blog/:username/blogbyuser' element={<Blogbyuser />} /> */}
      {/* <Route path="/myblog" element={<Myblog />} /> */}
      <Route path="*" element={<Error />} />

    </Routes>
  </BrowserRouter>
  )
}

export default App