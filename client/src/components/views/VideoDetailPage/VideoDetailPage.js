import React,{useEffect,useState} from 'react'
import {Row,Col,List,Avatar} from 'antd'
import axios from 'axios'
import SideVideo from './Section/SideVideo'
import Subscribe from './Section/Subscribe'
import Comment from './Section/Comment'
import LikeDislikes from './Section/LikeDislikes'
function VideoDetailPage(props) {
    const videoId = props.match.params.videoId
    const varialbe = {
        videoId : videoId
    }

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    useEffect(() => {
        axios.post("/api/video/getVideoDetail",varialbe)
            .then(res => {
                if(res.data.success){
                    setVideoDetail(res.data.videoDetail)
                }else{
                    alert("비디오 정보를 가져오는데 실패했습니다.")
                }
            })

        axios.post("/api/comment/getComments",varialbe)
        .then(res=>{
            if(res.data.success){
                setComments(res.data.comments)
                console.log(res.data)
               
            }else{
                alert("댓글 정보를 가져오는데 실패했습니다.")
            }
        })
        
    }, [])

    const refreshFunction=(newComment)=>{
        setComments(Comments.concat(newComment))
    }

    if (VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id!==localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[<LikeDislikes video userId={localStorage.getItem("userId")} videoId={videoId}/> ,subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                title={<a href="https://ant.design">{VideoDetail.title}</a>}
                                description={VideoDetail.description}
                            />
                            <div></div>
                        </List.Item>
                        <Comment refreshFunction={refreshFunction} postId={videoId} commentList={Comments} />

                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    <SideVideo />

                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage
