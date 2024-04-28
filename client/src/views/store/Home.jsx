import React from 'react';
import HomeListCategory from '../../components/HomeListCategory';
import CategoryProducts from '../../components/HomeCategoryProducts';
import ListNew from '../../components/ListNew';
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
                <CategoryProducts name="Capacitor cerámico" category="Capacitor cerámico" />
                <CategoryProducts name="Microcontroladores" category="Microcontroladores" />
            </div>
        </div>
    )
}

export default Home
