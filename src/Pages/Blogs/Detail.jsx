import React from "react";
import { useParams } from "react-router-dom";
import BlogsCSS from "./Blogs.module.css";

const Detail = () => {
  const { id } = useParams();

  const blogData = [
    {
      id: 1,
      img: "https://via.placeholder.com/800x400",
      title: "The Best Authentic Lamongan Chicken Soup Recipe",
      content: "Lamongan Chicken Soup is a traditional Indonesian dish known for its rich and savory broth. Here's how you can make it at home...",
    },
    {
      id: 2,
      img: "https://via.placeholder.com/800x400",
      title: "Tips for Cooking Meat to Make It Tender",
      content: "Cooking meat to perfection requires the right techniques. Here are some tips to ensure your meat is always tender and juicy...",
    },
    {
      id: 3,
      img: "https://via.placeholder.com/800x400",
      title: "Read This to Prevent Your Rice from Going Bad Again",
      content: "Storing rice properly is essential to keep it fresh. Follow these tips to prevent your rice from spoiling...",
    },
    {
      id: 4,
      img: "https://via.placeholder.com/800x400",
      title: "How to Store Fruit to Keep It Fresh Longer in the Fridge",
      content: "Learn the best ways to store fruits in your fridge to keep them fresh and delicious for longer...",
    },
    {
      id: 5,
      img: "https://via.placeholder.com/800x400",
      title: "7 Easy Diet Recipes for Beginners",
      content: "Starting a diet? Try these 7 easy and healthy recipes that are perfect for beginners...",
    },
    {
      id: 6,
      img: "https://via.placeholder.com/800x400",
      title: "A Yellow Rice Recipe That Everyone Will Love",
      content: "Yellow rice is a flavorful and colorful dish. Here's a simple recipe that everyone will enjoy...",
    },
    {
      id: 7,
      img: "https://via.placeholder.com/800x400",
      title: "5 Chicken Recipe Variations for Ramadan Suhoor",
      content: "Make your Ramadan suhoor special with these 5 delicious chicken recipe variations...",
    },
  ];

  const blog = blogData.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return <div>Blog tidak ditemukan.</div>;
  }

  return (
    <div className={BlogsCSS.DetailBlogs}>
      <h1>{blog.title}</h1>
      <img src={blog.img} alt={blog.title} />
      <p>{blog.content}</p>
    </div>
  );
};

export default Detail;