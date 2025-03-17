import React from 'react';
import { Link } from 'react-router-dom';
import categoryCSS from './../Category/Category.module.css';

import category01 from './../../assets/breakfast.png';
import category02 from './../../assets/lunch.png';
import category03 from './../../assets/dinner.png';
import category04 from './../../assets/beverage.png';
import category05 from './../../assets/desserts.png';
import category06 from './../../assets/snack.png';

const CategoryWrapper = () => {
  return (
    <div className={categoryCSS.category_wrapper}>
      <div className={categoryCSS.category_item}>
        <Link to="/recipe/breakfast">
          <img src={category01} alt="Breakfast" />
        </Link>
      </div>

      <div className={categoryCSS.category_item}>
        <Link to="/recipe/lunch">
          <img src={category02} alt="Lunch" />
        </Link>
      </div>

      <div className={categoryCSS.category_item}>
        <Link to="/recipe/dinner">
          <img src={category03} alt="Dinner" />
        </Link>
      </div>

      <div className={categoryCSS.category_item}>
        <Link to="/recipe/snack">
          <img src={category04} alt="Snack" />
        </Link>
      </div>

      <div className={categoryCSS.category_item}>
        <Link to="/recipe/dessert">
          <img src={category05} alt="Dessert" />
        </Link>
      </div>

      <div className={categoryCSS.category_item}>
        <Link to="/recipe/drink">
          <img src={category06} alt="Drink" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryWrapper;