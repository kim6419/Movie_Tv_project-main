import React, { useEffect } from 'react';
import Axios from 'axios'

function MovieFavorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.movieTitle;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    useEffect(() => {

        let variables = {
            userFrom,
            movieId
        }

        // 서버에 요청
        Axios.post('/api/favorite/favoriteNumber', variables)
            // 서버에서 받은 값을 결과 값으로
            .then(response => {
                console.log(response.data)
                // 성공시
                if (response.data.success) {

                    // 실패시
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })

    }, [])

    return (
        <div>
            <button>Favorite</button>
        </div>
    );
}

export default MovieFavorite;