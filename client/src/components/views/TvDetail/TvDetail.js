import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import TvInfo from './Sections/TvInfo';
import TvGridCards from '../commons/TvGridCards';
import { Row } from 'antd';
import Favorite from './Sections/Favorite';

function TvDetail(props) {

    // tvId 불러오기
    let tvId = props.match.params.tvId
    const [Tv, setTv] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {

        let endpointCrew = `${API_URL}tv/${tvId}/credits?api_key=${API_KEY}&language=ko-KR`;

        let endpintInfo = `${API_URL}tv/${tvId}?api_key=${API_KEY}&language=ko-KR`;

        // console.log(props.match)

        fetch(endpintInfo)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                setTv(response);
            })

            fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
  
                setCasts(response.cast);
            })

      

    }, [])

    const toggleActorView = () =>{
      setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/* Header */}

            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Tv.backdrop_path}`}
                title={Tv.name}
                text={Tv.overview}
            />
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Favorite TvInfo={Tv} tvId={tvId} userFrom={localStorage.getItem('userId')} />
                </div>
                {/* TvInfo */}

                <TvInfo
                    tv={Tv}
                />

                <br />
                {/* Actors Grid */}
        

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> 배우 정보 보기 </button>
                </div>

                {ActorToggle &&
                  <Row gutter={[16, 16]} >

                      {Casts && Casts.map((cast, index) => (
                          <React.Fragment key={index}>
                              <TvGridCards
                                  image={cast.profile_path ?
                                      `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                  charactorName={cast.name}
                              />
                          </React.Fragment>
                      ))}

                  </Row>
                }

            </div>
        </div>
    );
}

export default TvDetail;