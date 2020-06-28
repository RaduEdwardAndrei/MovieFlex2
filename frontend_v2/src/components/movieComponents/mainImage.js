import React from 'react'
import { Typography } from 'antd';
import { Card } from 'react-bootstrap';

const { Title } = Typography;

function MainImage(props) {
    return (
        <Card className="bg-dark text-white" >
            <Card.Img src={props.image} alt={props.title} />
            <Card.ImgOverlay>
                <div>
                    <div style={{ position: 'absolute', bottom: '2rem', marginLeft: '2rem' }} >
                        <Title style={{maxWidth: '450px'}} level={2} > {props.title} </Title>
                        <p style={{ fontSize: '1rem', maxWidth: '550px' }} >{props.text} </p>
                        <p style={{ fontSize: '1rem', maxWidth: '550px' }} >{props.genre} </p>
                    </div>
                </div>
            </Card.ImgOverlay>
        </Card>
    )
}

export default MainImage;