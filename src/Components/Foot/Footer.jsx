import React from "react";
import footerCSS from "./Footer.module.css"

function Footer() {
    return(
        <div className={footerCSS.footer_wrapper}>
            <div className={footerCSS.top_container}>
                <div className={footerCSS.logo}>
                    <a href="#">Foodieland<span>.</span></a>
                </div>
                <div className={footerCSS.social}>
                    <i className="ri-instagram-line"></i>
                    <i className="ri-facebook-fill"></i>
                    <i className="ri-twitter-x-line"></i>
                    <i className="ri-tiktok-fill"></i>
                </div>
            </div>
            <div className={footerCSS.bottom_container}>
                <div className={footerCSS.footerLinks}>
                    <h3>Delicious & easy recipes for joyful cooking. Happy <br/> Cooking!</h3>
                </div>
                <div className={footerCSS.footerLinks}>
                    <h4>Information</h4>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Privacy policy</a></li>
                        <li><a href="#">Terms & Condition</a></li>
                        <li><a href="#">Disclaimer</a></li>
                    </ul>
                </div>
                <div className={footerCSS.footerLinks}>
                    <h4>Navigation</h4>
                    <ul>
                        <li><a href="#">Latest Recipes</a></li>
                        <li><a href="#">Recipe Categories</a></li>
                        <li><a href="#">Articles & Tips</a></li>
                        <li><a href="#">Cooking Videos</a></li>
                        <li><a href="#">Popular Recipes</a></li>
                    </ul>
                </div>
                <div className={footerCSS.footerLinks}>
                    <h4>Our Newsletter</h4>
                    <p>Subscribe to our newsletter for delicious recipes & cooking tips straight to your inbox!</p>

                    <div className={footerCSS.inputWrapper}>
                        <input type="email" placeholder="Enter your email"/>
                        <button className={footerCSS.button}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer