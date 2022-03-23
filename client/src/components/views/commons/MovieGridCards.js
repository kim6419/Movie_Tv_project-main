import React from 'react';
import { Col } from 'antd';


function MovieGridCards(props) {
    // GridCards를 여러곳에서 사용하기 때문에 if로 나누는데
    // 이때 props에 landingPage가 있다면 ... 이런식으로 나눠준다.
    if (props.landingPage) {
        return (
            // 컴럼 하나의 사이즈는 6
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`} >
                        <img style={{ width: '100%', height: '320px' }}
                            src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        );

    } else {
        return (
            // 컴럼 하나의 사이즈는 6
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%', height: '320px' }}
                        src={props.image} alt={props.characterName} />

                </div>
            </Col>
        );
    }

}

export default MovieGridCards;