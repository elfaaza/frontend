import React from 'react'
import categoryCSS from './../Category/Category.module.css'
import { Link } from 'react-scroll'

import category01 from './../../assets/breakfast.png'
import category02 from './../../assets/lunch.png'
import category03 from './../../assets/dinner.png'
import category04 from './../../assets/beverage.png'
import category05 from './../../assets/desserts.png'
import category06 from './../../assets/snack.png'

const CategoryWrapper = () => {
  return (
    <div className={categoryCSS.category_wrapper}>
      <div className={categoryCSS.category_item}>
        <Link to="breakfast" smooth={true} duration={500}>
          <img src={category01} alt="Breakfast" />
        </Link>
      </div>

      <div className={categoryCSS.category_item}>
        <Link to="lunch" smooth={true} duration={500}>
          <img src={category02} alt="Lunch" />
        </Link>
      </div>

       {/* Dinner */}
       <div className={categoryCSS.category_item}>
        <Link to="dinner" smooth={true} duration={500}>
          <img src={category03} alt="Dinner" />
        </Link>
      </div>

      {/* Snack */}
      <div className={categoryCSS.category_item}>
        <Link to="snack" smooth={true} duration={500}>
          <img src={category04} alt="Snack" />
        </Link>
      </div>

      {/* Dessert */}
      <div className={categoryCSS.category_item}>
        <Link to="dessert" smooth={true} duration={500}>
          <img src={category05} alt="Dessert" />
        </Link>
      </div>


      <div className={categoryCSS.category_item}>
        <Link to="drink" smooth={true} duration={500}>
          <img src={category06} alt="Drink" />
        </Link>
      </div>
    </div>
  )
}

export default CategoryWrapper
