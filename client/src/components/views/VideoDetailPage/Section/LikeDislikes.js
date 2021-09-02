import React,{useEffect,useState} from 'react'
import {Tooltip} from 'antd'
import {LikeOutlined,DislikeOutlined, DislikeFilled, LikeFilled} from '@ant-design/icons';
import axios from 'axios';
function LikeDislikes(props) {
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)

    let variable = {}
    if(props.video){
        variable = {videoId : props.videoId,userId:props.userId}
    }else{
        variable = {commentId : props.commentId,userId:props.userId}
    }

    useEffect(() => {
        axios.post("/api/like/getLikes",variable)
        .then(res=>{
            if(res.data.success){

                // 좋아요 개수
                setLikes(res.data.likes.length)
                //내가 조아요 눌렀는지
                res.data.likes.map(like=>{
                    if(like.userId === props.userId){
                        setLikeAction('liked')
                    }
                })
            }else{
                alert("좋아요 정보를 가져오지 못했습니다.")
            }
        })

        axios.post("/api/like/getDislikes",variable)
        .then(res=>{
            if(res.data.success){
                // 싫어요 개수
                setDislikes(res.data.dislikes.length)
                //내가 싫어요 눌렀는지
                res.data.dislikes.map(dislike=>{
                    if(dislike.userId === props.userId){
                        setDislikeAction('disliked')
                    }
                })
            }else{
                alert("싫어요 정보를 가져오지 못했습니다.")
            }
        })

    }, [])

    const onLike = () => {
        if(LikeAction === null){
            axios.post("/api/like/upLike",variable)
            .then(res => {
                if(res.data.success){
                    setLikes(Likes+1)
                    setLikeAction("liked")

                    if(DislikeAction !== null){
                        setDislikeAction(null)
                        setDislikes(Dislikes-1)
                    }
                }else{
                    alert("좋아요 실패")
                }
            })
        }else{
            axios.post("/api/like/unlike",variable)
            .then(res => {
                if(res.data.success){
                    setLikes(Likes-1)
                    setLikeAction(null)
                }else{
                    alert("unlike 실패")
                }
            })
        }
    }


    const onDislike = () =>{
        if(DislikeAction !== null){
            axios.post("/api/like/unDislike",variable)
            .then(res => {
                if(res.data.success){
                    setDislikes(Dislikes-1)
                    setDislikeAction(null)
                }else{
                    alert("undislike 실패")
                }
            })
        }else{
            axios.post("/api/like/upDislike",variable)
            .then(res => {
                if(res.data.success){
                    setDislikes(Dislikes+1)
                    setDislikeAction("disliked")

                    if(LikeAction !== null){
                        setLikeAction(null)
                        setLikes(Likes-1)
                    }
                }else{
                    alert("updislike 실패")
                }
            })
        }
    }


    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    {LikeAction !== 'liked' &&
                        <LikeOutlined 
                            type="like"
                            onClick={onLike} />
                    }
                    {LikeAction === 'liked' &&
                        <LikeFilled 
                            type="like"
                            onClick={onLike} />
                    }
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {DislikeAction !== 'disliked' &&
                        <DislikeOutlined 
                            type="like"
                            onClick={onDislike} />
                    }
                    {DislikeAction === 'disliked' &&
                        <DislikeFilled 
                            type="like"
                            onClick={onDislike} />
                    }
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>&nbsp;&nbsp;
        </React.Fragment>
    )
}

export default LikeDislikes
