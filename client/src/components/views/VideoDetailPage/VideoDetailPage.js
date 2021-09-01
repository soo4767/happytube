import React,{useEffect,useState} from 'react'
import {Row,Col,List,Avatar} from 'antd'
import axios from 'axios'
function VideoDetailPage(props) {
    const videoId = props.match.params.videoId
    const varialbe = {
        videoId : videoId
    }

    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        axios.post("/api/video/getVideoDetail",varialbe)
            .then(res => {
                if(res.data.success){
                    setVideoDetail(res.data.videoDetail)
                }else{
                    alert("비디오 정보를 가져오는데 실패했습니다.")
                }
            })
    }, [])

    return (
        <Row gutter={[16,16]}>
            <Col lg={18} xs={24}>
                <div style={{width:"100%", padding:"3rem 4rem"}}>
                    <video style={{width:"100%"}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
                    <List.Item
                        actions
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={VideoDetail.writer?.image} />}
                            title={VideoDetail.writer?.name}
                            description={VideoDetail.description}
                            />

                    </List.Item>
                    {/* Comment */}
                </div>
            </Col>
            
            <Col lg={6} xs={4}>
                Side Videos
            </Col>
        </Row>
    )
}

export default VideoDetailPage
