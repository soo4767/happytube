import axios from 'axios'
import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
function Comment(props) {
    const user = useSelector(state => state.user)
    const videoId = props.postId

    const [CommentValue, setCommentValue] = useState("")

    const handleChange = (e) =>{
        setCommentValue(e.currentTarget.value)
    }
    const onSubmit = (e) =>{
        e.preventDefault()

        const variables = {
            content:CommentValue,
            writer:user.userData._id,
            postId:videoId,
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


    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>
            
            {/* Comment Lists */}
            {props.commentList && props.commentList.map((comment,index) => (
                    (!comment.responseTo &&
                        <React.Fragment>
                            <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId}/>
                            <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentList={props.commentList}/>
                        </React.Fragment>
                    )
                ))
            }
            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="댓글을 작성해주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
