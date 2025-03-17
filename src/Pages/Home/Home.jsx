import React from 'react';
import Header from '../../Components/Nav/Header/Header';
import CategoryWrapper from '../../Components/Category/CategoryWrapper';
import Search from '../../Components/Search/Search';
import About from '../About/About';

const Home = () => {
    return (
        <div>
            <Header />
            <CategoryWrapper />
            <About />
            <Search />
        </div>
    );
};

export default Home;