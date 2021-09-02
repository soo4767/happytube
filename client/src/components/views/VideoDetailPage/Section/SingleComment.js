import React,{useState,useEffect} from 'react'
import { Comment, Avatar } from 'antd';
import axios from 'axios';
import {useSelector} from 'react-redux'
import LikeDislikes from './LikeDislikes';
function SingleComment(props) {
    const user = useSelector(state => state.user)
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen = () =>{
        setOpenReply(!OpenReply)
    }

    const onHandleChange=(e)=>{
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        const variables = {
            content:CommentValue,
            writer:user.userData._id,
            postId:props.postId,
            responseTo:props.comment._id, 
        }
        axios.post('/api/comment/saveComment',variables)
        .then(res=>{
            if(res.data.success){
                console.log(res.data)
                props.refreshFunction(res.data.result)
                setCommentValue("")
            }else{
                alert("커맨트를 불러오지 못했습니다")
            }
        })
    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem("userId")} commentId={props.comment._id}/>,
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            {console.log(props.comment)}
            <Comment
                actions = {actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>

            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="댓글을 작성해주세요"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
                </form>

            }
        </div>
    )
}

export default SingleComment
