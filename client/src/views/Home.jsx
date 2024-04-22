import React from 'react';
import HomeListCategory from '../components/HomeListCategory';
import CategoryProducts from '../components/HomeCategoryProducts';
import ListNew from '../components/ListNew';
import '../styles/Home.css';
import { SlSocialFacebook ,SlSocialInstagram, SlSocialTwitter , SlSocialPintarest} from "react-icons/sl";
// import Footer from './Footer';

function Home() {
    return (
        <div className='home'>
            <div className='homeCat'>
                <HomeListCategory />
                <ListNew/>
            </div>
            <div className='categorys'>
                <CategoryProducts name="Capacitores" category="capacitor" />
                <CategoryProducts name="microcontrolador" category="microcontrolador" />
            </div>
        </div>
    )
}

export default Home
