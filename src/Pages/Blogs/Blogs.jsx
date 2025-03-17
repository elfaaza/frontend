import React from "react";
import { Link } from "react-router-dom";
import BlogsCSS from "./Blogs.module.css";

import BlogsImg1 from "./../../assets/blogs2.jpg";
import BlogsImg2 from "./../../assets/blogs1.jpg";
import BlogsImg3 from "./../../assets/blogs3.jpg";
import BlogsImg4 from "./../../assets/blogs4.jpg";
import BlogsImg5 from "./../../assets/blogs5.jpg";
import BlogsImg6 from "./../../assets/blogs6.jpg";
import BlogsImg7 from "./../../assets/blogs7.jpg";

function Blogs() {
  const blogData = [
    { id: 1, img: BlogsImg1, title: "The Best Authentic Lamongan Chicken Soup Recipe" },
    { id: 2, img: BlogsImg2, title: "Tips for Cooking Meat to Make It Tender" },
    { id: 3, img: BlogsImg3, title: "Read This to Prevent Your Rice from Going Bad Again" },
    { id: 4, img: BlogsImg4, title: "How to Store Fruit to Keep It Fresh Longer in the Fridge" },
    { id: 5, img: BlogsImg5, title: "7 Easy Diet Recipes for Beginners" },
    { id: 6, img: BlogsImg6, title: "A Yellow Rice Recipe That Everyone Will Love" },
    { id: 7, img: BlogsImg7, title: "5 Chicken Recipe Variations for Ramadan Suhoor" },
  ];

  return (
    <div className={`${BlogsCSS.Blogs_wrapper} section`} id="blogs">
      {blogData.map((blog) => (
        <div className={BlogsCSS.BlogsCard} key={blog.id}>
          <img src={blog.img} alt={`Blog ${blog.id}`} />
          <div className={BlogsCSS.content}>
            <h3>{blog.title}</h3>
            <Link to={`/blogs/${blog.id}`} className={BlogsCSS.button}>View More</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blogs;