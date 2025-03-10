import React from 'react'
import headerCSS from './Header.module.css';
import { Swiper } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules';

function Header() {
    return(
        <div className={`${headerCSS.header_wrapper} section`}>
            <div className={headerCSS.imageContainer}>
                <h2>Explore Your Taste,<br/>Make Someone Happy</h2>
            </div>

            <Swiper 
                spaceBetween={30}
                slidesPerView={5}
                loop={true}
                autoplay={
                    {
                        delay: 1500,
                    }
                }
                breakpoints={
                    {
                        0:{
                            slidesPerView: 1,
                        },

                        500:{
                            slidesPerView: 2,
                        },

                        768:{
                            slidesPerView: 3,
                        },

                        1024:{
                            slidesPerView: 4,
                        },

                        1200:{
                            slidesPerView: 4,
                        },
                    }
                }
                modules={[Autoplay]}

            className={headerCSS.swiper}>
            </Swiper>
        </div>
    )
}

export default Header