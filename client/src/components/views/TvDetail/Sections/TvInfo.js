import React from 'react'
import { Descriptions, Badge } from 'antd';

function  TvInfo(props) {

    let { tv } = props;

    return (
        <Descriptions title="방영정보" bordered>
            <Descriptions.Item label="제목">{tv.name}</Descriptions.Item>
            <Descriptions.Item label="최초공개일">{tv.first_air_date}</Descriptions.Item>
            <Descriptions.Item label="최근 공개 회차">{tv.last_air_date}</Descriptions.Item>
            <Descriptions.Item label="런타임">{tv.episode_run_time}</Descriptions.Item>
            <Descriptions.Item label="평균" span={2}>
                {tv.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="득표수">{tv.vote_count}</Descriptions.Item>
            <Descriptions.Item label="국가">{tv.origin_country}</Descriptions.Item>
            <Descriptions.Item label="인기도">{tv.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default TvInfo