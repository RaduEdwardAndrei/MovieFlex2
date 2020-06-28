import React, { Component } from 'react';
import CardComponent from './CardUI';

class Cards extends Component {
    render () {
        return (
            <div className='container-fluid d-flex justify-content-center'>
                <div className='row'>
                    <div className='col-md-4'>
                        <CardComponent />
                    </div>
                    <div className='col-md-4'>
                        <CardComponent />
                    </div>
                    <div className='col-md-4'>
                        <CardComponent />
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards;