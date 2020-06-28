import React from 'react';
// import './card-style.css';
import profilepic from '../../img/profilepic.jpg';

const CardComponent = (props) => {

    return (
        <div className='card text-center shadow'>
            <div className='overflow'>
                <img src={profilepic} alt="MovieImage" className='card-img-top' />
            </div>
            <div className='card-body text-dark'>
                <h4 className='card-title'>Titlu</h4>
                <p className='card-text text-secondary'>
                    Lorem ipsum
                </p>
                <a href='#' className='btn-btn-outline-success'>
                    View Info
                </a>
            </div>
        </div>
    )
}

export default CardComponent;