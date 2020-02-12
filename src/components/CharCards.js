import React from 'react';
import './styles/CharCards.css';

const CharCards = ({ data }) => {
    return(
        <div className="Char__container">
            <img className="Characters__img" src={data.avatarUrl} alt=""/>
            <p className="Char__name">{data.firstName} {data.lastName}</p>
        </div>
    )
}

export default CharCards;