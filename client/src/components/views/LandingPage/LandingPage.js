import React,{useEffect,useState} from 'react'
import {Typography,Row,Card,Col,Avatar} from 'antd'
import axios from 'axios';
import moment from 'moment';

const {Title} = Typography
const {Meta} = Card;
function LandingPage() {

    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
        .then(res=>{
            if(res.data.success){
                console.log(res.data)
                setVideos(res.data.videos)
            }else{
                alert("비디오 가져오기를 실패 했습니다.")
            }
        })
    }, [])
    const renderCards = Videos.map((video,index)=>{
        var hours = Math.floor(video.duration / 60 / 60);
        var min = Math.floor(video.duration / 60)
        var sec = Math.floor(video.duration % 60)

        return <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/video/post/${video._id}`}>
                        <div style={{position:'relative'}}>
                            <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} />
                            <div className="duration">
                            {
                                hours >= 1 ? <span>{hours}: {min} : {sec}</span> : <span>{min} : {sec}</span> 
                            }
                            </div>
                        </div>
                    </a>
                </div><br/>
                <Meta
                    avatar={
                        <Avatar src={video.writer.image} />
                    }
                    title={video.title}
                />
                <span>{video.writer.name}</span><br/>
                <span style={{marginLeft:'3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
            </Col>
        
    })

    return (
        <div style={{width:"85%",margin:"3rem auto"}}>
            <Title level={2}>Recommended</Title>            
            <hr/>
            <Row gutter={[32,16]}>

                {renderCards}


            </Row>
        </div>
    )
}

export default LandingPage
