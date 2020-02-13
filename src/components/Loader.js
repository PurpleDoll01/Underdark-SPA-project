import React from 'react';

import './styles/Loader.css';

const Loader = () => {
    return (
        <div className="Loading__container">
            <div className="lds-grid">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
}

export default Loader;


  