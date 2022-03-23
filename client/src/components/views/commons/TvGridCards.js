import React from 'react'
import {Col} from 'antd';

function TvGridCards(props) {

    if (props.TvLandingPage) {
        return (
        <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
            <a href={`/tv/${props.tvId}`} >
                <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.tvName} />
            </a>
        </div>
        </Col>
        )
        
    }
    else{
        return(
            <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                
                    <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.charactorName} />
              
            </div>
            </Col>

        )
    }
    
}

export default TvGridCards

