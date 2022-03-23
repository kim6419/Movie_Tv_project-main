import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../ConfigMovie';
import MovieMainImage from './Sections/MovieMainImage'
import MovieGridCards from '../commons/MovieGridCards';
import { Row } from 'antd';

function MovieLandingPage() {
    // json 값이 여러개이므로 배열로 state 생성
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    // 페이지를 저장할 state
    const [CurrentPage, setCurrentPage] = useState(0);

    // useEffect : 컴포넌트 부수효과 관리 (API호출, 이벤트 처리 등)
    useEffect(() => {
        // 영화 정보를 가져오는 API 적용
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetchMovies(endpoint);

    }, [])


    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            // json 처리로 읽을 수 있도록 함
            .then(response => response.json())
            .then(response => {
                console.log(response.results)
                // api에서 받아온 json안 result 값을 배열로 넣어준다.
                // 기존 Moives 데이터에 results값을 추가 시키기
                setMovies([...Movies, ...response.results])
                //console.log(Movies);
                // 0번째(가장 유명한 영화) json 결과값을 모두 넣어준다.
                setMainMovieImage(response.results[0])
                // 현재 페이지 값 저장
                setCurrentPage(response.page)
            })
    }

    const loadMoreItems = () => {
        // 저장한 현재페이지에 + 1 값으로 api에서 불러옴
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }



    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}
            {/* && 있다면 처리하라는 명령 */}
            {MainMovieImage &&
                <MovieMainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]}>
                    {/* Movie map 설정 => movie */}
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <MovieGridCards
                                landingPage
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}


                </Row>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* 버튼 클릭시 */}
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default MovieLandingPage
