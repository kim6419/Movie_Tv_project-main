import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../ConfigMovie';
import MovieMainImage from '../LandingPage/Sections/MovieMainImage';
import MovieInfo from './Sections/MovieInfo';
import MovieGridCards from '../commons/MovieGridCards';
import { Row } from 'antd';
import Favorite from './Sections/MovieFavorite';

function MovieDetail(props) {

    // movieId 불러오기
    // params로 URL을 통해서 넘겨줌
    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    // toggle클릭시 보여주게 하기위해서 추가 : ActorToggle이 true일때 뿌려주기
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        let endpintInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        // console.log(props.match)

        fetch(endpintInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response);
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('responseForCrew', response)
                setCasts(response.cast);
            })

    }, [])

    const toggleActorView = () => {
        // 실행시 false => true => false => true 반복 : !(반대)
        setActorToggle(!ActorToggle)
    };

    return (
        <div>
            {/* Header */}

            <MovieMainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* 페이버릿 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {/* localStorage에 있는 값 가져오기 */}
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>


                {/* Movie Info */}

                <MovieInfo
                    movie={Movie}
                />

                <br />

                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>


                {/* ActorToggle이 있을때(true) 뿌리기 */}
                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <MovieGridCards
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}


                    </Row>

                }

            </div>
        </div>
    );
}

export default MovieDetail;