import React from 'react';
import aboutCSS from './About.module.css';

import aboutImg from './../../assets/about.png';

function About() {
    return(
        <div className={`${aboutCSS.about_wrapper} section`} id="about">
            <div className={aboutCSS.about_image}>
                <img src={aboutImg}/>
            </div>
            <div className={aboutCSS.about_content}>
                <h2>About Us</h2>
                <p>Welcome to <strong>Foodieland</strong>, your go-to source for delicious and easy recipes! We offer a variety of tested recipes to make cooking enjoyable.
               <strong> Happy Cooking!</strong></p>
                <div className={aboutCSS.about}>
                    <p><i className="ri-book-open-line"></i> Easy-to-Follow Recipes</p>
                    <p><i className="ri-restaurant-line"></i> Diverse Cuisine Selection</p>
                    <p><i className="ri-heart-pulse-line"></i> Healthy & Nutritious Options</p>
                    <p><i className="ri-earth-line"></i> Free Access Anytime</p>
                    <p><i className="ri-timer-flash-line"></i> Quick & Time-Saving Meals</p>
                    <p><i className="ri-lightbulb-line"></i> Cooking Tips & Tricks</p>
                </div>
            </div>
        </div>
    )
}

export default About