import React from 'react';
import Image from '../images/Menzoberranzan.jpg';

import './styles/HomeImage.css';

const HomeImage = () => {
    return (
        <div className="Container">
            <img className="Home__image" src={Image} alt="Hero"/>
            <p className="Home__para">Welcome to the Underdark. Let's hope you can find the light</p>
        </div>
    )
}

export default HomeImage;