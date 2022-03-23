import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import axios from 'axios';
import { Row } from 'antd';
import TvGridCards from '../commons/TvGridCards';


function TvLandingPage() {


    const [Tv, setTv] = useState([])
    const [MainTvImage, setMainTvImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)
   
   

    useEffect(() => {
        const endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`;      
        fetchTv(endpoint)
            
    }, [])

    const fetchTv = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setTv([...Tv, ...response.results])
                setMainTvImage(response.results[0])
                setCurrentPage(response.page)
            })
    }

    const loadMoreItems = () => {

        const endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage + 1}`;
        fetchTv(endpoint)

    }
   


    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}
            {MainTvImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainTvImage.backdrop_path}`}
                    title={MainTvImage.name}
                    text={MainTvImage.overview}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]} >

                    {Tv && Tv.map((Tv, index) => (
                        <React.Fragment key={index}>
                            <TvGridCards
                            TvLandingPage
                                image={Tv.poster_path ?
                                    `${IMAGE_BASE_URL}w500${Tv.poster_path}` : null}
                                tvId={Tv.id}
                                tvName={Tv.original_title}
                            />
                        </React.Fragment>
                    ))}

                </Row>
                
{/* 깃업로드 테스트 */}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={loadMoreItems}> 더보기 </button>
            </div>

        </div>
    )
}

export default TvLandingPage