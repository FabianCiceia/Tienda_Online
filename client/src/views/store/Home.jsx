import React from 'react';
import HomeListCategory from '../../components/home/HomeListCategory';
import CategoryProducts from '../../components/home/HomeCategoryProducts';
import ListNew from '../../components/home/ListNew';
import '../../styles/Home.css';

// import Footer from './Footer';

function Home() {
    return (
        <div className='home'>
            <div className='homeCat '>
                <HomeListCategory  />
                <ListNew/>
            </div>
            <div className='categorys'>
                <CategoryProducts name="Microcontroladores" category="Microcontroladores" />
                <CategoryProducts name="Capacitor cerámico" category="Capacitor cerámico" />
            </div>
        </div>
    )
}

export default Home
